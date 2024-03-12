import React, { useState,useEffect } from "react";
import { Form, Spinner, Alert, Col, Row, Badge, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useNavigation } from "react-router-dom";

//***************************************************************************************/
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useApiHook } from "utils/api";
import Head from "layout/head/Head";
import Content from "layout/content/Content";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, Icon, PreviewCard } from "components/Component";
import SingleEmailListLogs from "./SingleEmailListLogs";

const SendSingleEmail = () => {
  const [errorVal, setErrorValue] = useState("");
  const { useApi, isLoading, error, data } = useApiHook();
  const [apiData, setApiData] = useState(null);
  const navigate = useNavigate();

  const onFormSubmit = (formData) => {
    setErrorValue("");
  
    console.log("Form Data:", formData);
  
    useApi
      .post("api/admin/email/email-to-singleUser", formData)
      .then((response) => {
        reset();
        toast.success("Successfully Mass Send", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        setApiData((prevData) => [...prevData, response]);
        navigate("/mass-email");
      })
      .catch((error) => {
        console.error("Error in API call:", error);
  
        if (error.response && error.response.data && error.response.data.errors) {
          // Set the server-side validation errors in the form state
          const serverErrors = error.response.data.errors;
          for (let field in serverErrors) {
            setError(field, {
              message: serverErrors[field],
            });
          }
        }
      });
  };

  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // {resolver:yupResolver(createBranchValidationSchema)}
useEffect(() => {
  useApi.get("api/admin/email/all-sent-email")
    .then((response) => {
      setApiData(response);
      console.log("apiData:res", response); // Log the data inside the .then block
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);


const [currentDate, setCurrentDate] = useState('');

useEffect(() => {
  const formattedDate = new Date().toISOString().split('T')[0];
  setCurrentDate(formattedDate);
}, []); 
  return (
    <>
      <Head title="Add News" />
      <Content>
        <Block className="">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Send Email to Single User</BlockTitle>
              <BlockDes>
                <p>Enter Detail to Send Email</p>
              </BlockDes>
            </BlockContent>
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
          <Form className="is-alter w-50" onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-4">
              
              <Col lg="10">
               <div className="form-group">
                   <div className="form-label-group">
                   <label className="form-label" htmlFor="date">
                    Date <span className="text-danger">*</span>
                   </label>
               </div>
          <div className="form-control-wrap">
         <input
              type="text"
             id="date"
              {...register("date")}
              placeholder="Enter your date"
              className="form-control-lg form-control"
              readOnly // Make the input read-only
             value={currentDate}
        />
      {errors.date && <span className="invalid">{errors.date.message}</span>}
    </div>  
  </div>
              </Col>
              <Col lg="10">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="to">
                        To Whome <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="to"
                        {...register("to")}
                        placeholder="Enter your to"
                        className="form-control-lg form-control"
                      />
                      {errors.to && <span className="invalid">{errors.to.message}</span>}
                    </div>
                  </div>
              </Col>
            

              <Col lg="10">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="subject">
                        Subject <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="subject"
                        {...register("subject")}
                        placeholder="Enter your subject"
                        className="form-control-lg form-control"
                      />
                      {errors.subject && <span className="invalid">{errors.subject.message}</span>}
                    </div>
                  </div>
              </Col>

              <Col lg="10">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="html">
                        Content <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <textarea
                        type="text"
                        id="html"
                        {...register("html")}
                        placeholder="Enter your Content"
                        className="form-control-lg form-control"
                      />
                      {errors.html && <span className="invalid">{errors.html.message}</span>}
                    </div>
                  </div>
              </Col>

              <Col xl="10">
                  <Button className=" text-stone-500" disabled={isLoading} color="primary" size="lg" type="submit">
                    {isLoading ? (
                      <>
                        <Spinner size="sm" color="light" />
                        <span> Loading... </span>
                      </>
                    ) : (
                      "Send Mail"
                    )}
                  </Button>
              </Col>
              </Row>
            </Form>

            <div className="w-60" style={{ height: '400px', overflow: 'auto' }}>
             <SingleEmailListLogs />
             </div>
            {/* <div className="w-50" style={{ height: '400px', overflow: 'auto' }}>
            <label className="form-label" htmlFor="subject">
                        Subject
                      </label>
  <div className="mx-0 bg-gray h-[2px] rounded-l"></div>
  <table className="w-full">
    <thead>
      <tr>
        <th>Date</th>
        <th>Tite</th>
        <th>Content</th>
      </tr>
    </thead>
    <tbody>
      {apiData?.map(item => (
        <tr key={item?.createdAt}>
          <td className="border" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {new Date(item?.createdAt).toLocaleDateString()}
          </td>
          <td className="border" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item?.subject}
          </td>
          <td className="border" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item?.html}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
           </div> */}
          </div>
            <div className="form-note-s2 text-center pt-4">
              Skip and <Link to={`/mass-email`}><span className=" bg-red-400">Goto Mass Email List</span></Link>
            </div>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default SendSingleEmail;
