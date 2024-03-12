import React, { useEffect } from "react";
import { Modal, ModalBody, Form, Spinner, Col, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiHook } from "utils/api";
import { Icon } from "components/Component";
const EditBranchModal = ({ isOpen, toggle, branchData, updateBranch }) => {
  const [errorVal, setErrorValue] = useState("");
  const { useApi, isLoading, error, data } = useApiHook();
  useEffect(() => {
    reset();
  }, [branchData]);

  const onFormSubmit = (formData) => {
    console.log(branchData._id);
    setErrorValue("");
    useApi
      .put(`api/news/update/${branchData._id}`, formData)
      .then((response) => {
        reset();
        toast.success("Successfully News Updated", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        updateBranch();
        toggle();
      })
      .catch((error) => {
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

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            toggle();
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">Update News</h5>
          <div className="mt-4">
            <Form className="row gy-2" onSubmit={handleSubmit(onFormSubmit)}>
              {/* School Name field */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="title">
                      Title <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      defaultValue={branchData.title}
                      type="text"
                      id="title"
                      {...register("title")}
                      placeholder="e.g Decent Public School"
                      className="form-control-lg form-control"
                    />
                    {errors.title && <span className="invalid">{errors.title.message}</span>}
                  </div>
                </div>
              </Col>
              {/* Branch Name field */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="branchName">
                      Content<span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      defaultValue={branchData.content}
                      type="text"
                      id="content"
                      {...register("content")}
                      placeholder="Model Town Branch"
                      className="form-control-lg form-control"
                    />
                    {errors.content && <span className="invalid">{errors.content.message}</span>}
                  </div>
                </div>
              </Col>

              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Col xl="12">
                      <Button disabled={isLoading} color="primary" className=" text-stone-500" size="md" type="submit">
                        {isLoading ? (
                          <>
                            <Spinner size="sm" color="light" />
                            <span> Loading... </span>
                          </>
                        ) : (
                          "Update News"
                        )}
                      </Button>
                    </Col>
                  </li>
                  <li>
                    <Button
                      onClick={(ev) => {
                        ev.preventDefault();
                        toggle();
                      }}
                      className="link link-light"
                    >
                      Cancel
                    </Button>
                  </li>
                </ul>
              </Col>
            </Form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default EditBranchModal;
