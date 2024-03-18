import React, { useState } from "react";
import { useEffect } from "react";
import { useApiHook } from "utils/api";
import axios from "axios";

import {
  BlockBetween,
  BlockDes,
  Button,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
  ReactDataTable,
} from "components/Component";
import Head from "layout/head/Head";
import Content from "layout/content/Content";
import EditBranchModal from "./EditUserModal";
import { Form, Spinner, Alert, Col, Row, Badge, Card } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";


const AddNewsData = () => {
  const [errorVal, setErrorValue] = useState("");
  const [selectImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false); 

  const navigate = useNavigate();
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const clearFormData = () => {
    reset()
    setTitle('')
    setDescription('')
   
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImages(file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    let profilephoto = " ";
    setLoading(true); 
    let param = new FormData();
    param.append("avatars", selectImages);

    profilephoto = await axios.post(`http://18.133.248.196:8000/v1/uploadImage`, param);

    // console.log(profilephoto?.data?.success, "=====profile photo===");
    // console.log(title);
    // setReport(profilephoto?.data?.data[0]?.url);
    if (profilephoto?.data?.success === true) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        image: profilephoto?.data?.data[0]?.url,
        title: title,
        description: description,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://34.216.84.212/api/admin/News/add-news", requestOptions)
        .then((response) => response.text())
        .then((result) => {
         let data = JSON.parse(result)
        //  console.log(data.success);
         if (data.success === true) {
          clearFormData()
          setLoading(false); 
          toast("News Added Successfully")
         }else{
          setLoading(false); 
          toast("Something Went Wrong")
         }
        })
        .catch((error) => console.error(error));
    } else {
      setLoading(false); 
      toast("Please Try Again Later");
    }
  };

  return (
    <div>
      <Head title="User List" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Add News</BlockTitle>
              <BlockDes className="text-soft">Manage your News</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <h1>BlockHeadContent</h1>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <PreviewCard className=" nk-auth-pCard " bodyClass="card-inner-lg">
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> {errorVal}
              </Alert>
            </div>
          )}
          <div className="flex">
            <Form className="is-alter  w-50" onSubmit={handlerSubmit}>
              <Row className="flex flex-col g-4">
                <Col lg="11">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="username">
                        Title <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="username"
                        {...register("username", { required: "Title is required" })}
                        placeholder="Enter Title"
                        className="form-control-lg form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      {errors.username && <span className="invalid">{errors.username.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col lg="11">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="description">
                        Description <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="description"
                        {...register("description", { required: "Description is required" })}
                        placeholder="Enter Description"
                        className="form-control-lg form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col lg="11">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="image">
                        Upload Image <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="file"
                        id="image"
                        {...register("image", { required: "Image is required" })}
                        className="form-control-lg form-control"
                        onChange={handleFileChange}
                      />
                      {errors.image && <span className="invalid">{errors.image.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col xl="11">
                  <Button className="mr-2 text-stone-500" color="primary" size="lg" type="submit">
                  {isLoading ? (
                <>
                  <Spinner size="sm" color="light" />
                  <span> Loading... </span>
                </>
              ) : (
                "Add News"
              )}
                  </Button>
                  {/* onClick={handleCancel} */}
                  <Button className="text-stone-500" color="secondary" size="lg" type="button" onClick={clearFormData}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          <div className="form-note-s2 text-center pt-4">
            Skip go back to<Link to={`/user`}> User List</Link>
          </div>
        </PreviewCard>
      </Content>
      {/* <EditBranchModal
        isOpen={isModalOpen}
        toggle={() => setModalOpen(!isModalOpen)}
        branchData={branchModalData}
        updateBranch={updateBranch}
      /> */}
    </div>
  );
};

export default AddNewsData;
