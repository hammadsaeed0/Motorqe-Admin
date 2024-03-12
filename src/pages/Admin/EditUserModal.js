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
      .put(`api/admin/auth/update-admin/${branchData._id}`, formData)
      .then((response) => {
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
          <h5 className="title">Update User:{branchData._id}</h5>
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
                      defaultValue={branchData.name}
                      type="text"
                      id="name"
                      {...register("name")}
                      placeholder="User Name"
                      className="form-control-lg form-control"
                    />
                    {errors.name && <span className="invalid">{errors.name.message}</span>}
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
                      defaultValue={branchData.email}
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
              {/* Role*/}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="status">
                      Role <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-control-wrap">
                      <select
                        {...register("role")}
                        defaultValue={branchData.role}
                        className="form-control-lg form-control"
                        id="status"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                        
                      </select>
                      {errors.role && <span className="invalid">{errors.role.message}</span>}
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
