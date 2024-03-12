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
    console.log("formData",formData)

    setErrorValue("");
    useApi
      .put(`api/admin/user/update-user/${branchData._id}`, formData)
      .then((response) => {
        console.log("updated")
        reset();
        toast.success("Successfully User Updated", {
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
        console.log("eroor-----",error.response.status)
        if (error.response && error.response.data && error.response.data.errors) {
          // Set the server-side validation errors in the form state
          const serverErrors = error.response.data.errors;
          for (let field in serverErrors) {
            setError(field, {
              message: serverErrors[field],
            });
          }
        }
         if(error.response.status === 406){
          toast.warning(error.response.data.error, {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            hideProgressBar: true,
          });
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
          <h5 className="title">Update User</h5>
          <div className="mt-4">
            <Form className="row gy-2" onSubmit={handleSubmit(onFormSubmit)}>
              {/* School Name field */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="username">
                      user Name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      defaultValue={branchData?.username}
                      type="text"
                      id="username"
                      {...register("username")}
                      placeholder="e.g Decent Public School"
                      className="form-control-lg form-control"
                    />
                    {errors.username && <span className="invalid">{errors.username.message}</span>}
                  </div>
                </div>
              </Col>
              {/* Branch Name field */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="newPassword">
                     New Password<span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      
                      type="text"
                      id="newPassword"
                      {...register("newPassword")}
                      placeholder="Enter Your New Password"
                      className="form-control-lg form-control"
                    />
                    {errors.newPassword && <span className="invalid">{errors.newPassword.message}</span>}
                  </div>
                </div>
              </Col>
              {/* Email */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="email">
                      Email <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      defaultValue={branchData?.email}
                      type="text"
                      id="email"
                      {...register("email")}
                      placeholder="Enter your Email Address"
                      className="form-control-lg form-control"
                    />
                    {errors.email && <span className="invalid">{errors.email.message}</span>}
                  </div>
                </div>
              </Col>
              {/* status*/}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="status">
                      Status <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-control-wrap">
                      <select
                        {...register("status")}
                        defaultValue={branchData?.status}
                        className="form-control-lg form-control"
                        id="status"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="true">Active</option>
                        <option value="false">InActive</option>
                        
                      </select>
                      {errors.status && <span className="invalid">{errors.status.message}</span>}
                    </div>
                  </div>
                </div>
              </Col>
{/* Email Verification*/}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="isEmailVerified">
                      Email Verification <span className="text-danger"></span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-control-wrap">
                      <select
                        {...register("isEmailVerified")}
                        defaultValue={branchData?.isEmailVerified}
                        className="form-control-lg form-control"
                        id="isEmailVerified"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="true">Verified</option>
                        <option value="false">Not Verified</option>
                        
                      </select>
                      {errors.isEmailVerified && <span className="invalid">{errors.isEmailVerified.message}</span>}
                    </div>
                  </div>
                </div>
              </Col>
              

              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Col xl="12">
                      <Button className=" text-stone-500"disabled={isLoading} color="primary" size="md" type="submit">
                        {isLoading ? (
                          <>
                            <Spinner size="sm" color="light" />
                            <span> Loading... </span>
                          </>
                        ) : (
                          "Update User"
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
                      className="link link-light "
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
