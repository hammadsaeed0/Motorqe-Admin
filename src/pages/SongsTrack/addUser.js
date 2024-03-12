import React, { useState } from "react";

import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../../components/Component";
import { Form, Spinner, Alert, Col, Row, Badge } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useNavigation } from "react-router-dom";

//***************************************************************************************/
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import Head from "../../../layout/head/Head";
import createBranchValidationSchema from "../../../Validation/createBranchValidation";
import Content from "../../../layout/content/Content";
import { useApiHook } from "utils/api";

const AddBranch = () => {
  const [errorVal, setErrorValue] = useState("");
  const { useApi, isLoading, error, data } = useApiHook();
  const navigate = useNavigate()

  const onFormSubmit = (formData) => {
    setErrorValue("");
    useApi
      .post("api/branch/", formData)
      .then((response) => {
        reset()
        toast.success("Successfully Branch Created", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        navigate('/branch-list')
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
  } = useForm({ resolver: yupResolver(createBranchValidationSchema) });
  // {resolver:yupResolver(createBranchValidationSchema)}

  return (
    <>
      <Head title="add User" />
      <Content>
        <Block className="">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Create Your Branch</BlockTitle>
              <BlockDes>
                <p>Enter Detail to Create Your Branch</p>
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
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-4">
                {/* School Name field */}
                {/* ................................................................................................... */}
                <Col lg="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="schoolName">
                        School/Campus Name <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="schoolName"
                        {...register("schoolName")}
                        placeholder="e.g Decent Public School"
                        className="form-control-lg form-control"
                      />
                      {errors.schoolName && <span className="invalid">{errors.schoolName.message}</span>}
                    </div>
                  </div>
                </Col>
                {/* Branch Name field */}
                {/* ................................................................................................... */}
                <Col lg="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="branchName">
                        Branch Name <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="branchName"
                        {...register("branchName")}
                        placeholder="Model Town Branch"
                        className="form-control-lg form-control"
                      />
                      {errors.branchName && <span className="invalid">{errors.branchName.message}</span>}
                    </div>
                  </div>
                </Col>

                {/* School Type/Level */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="schoolLevel">
                        School Level <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-control-wrap">
                        <select
                          {...register("schoolLevel")}
                          defaultValue={""}
                          className="form-control-lg form-control"
                          id="schoolLevel"
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="Primary School">Primary School</option>
                          <option value="Middle School">Middle School</option>
                          <option value="High School">High School</option>
                          <option value="Secondary School">Secondary School</option>
                          <option value="College">College</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.schoolLevel && <span className="invalid">{errors.schoolLevel.message}</span>}
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Email */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="email">
                        Email <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="email"
                        {...register("email")}
                        placeholder="Enter Branch Email Address"
                        className="form-control-lg form-control"
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </div>
                  </div>
                </Col>

                {/* Contact Number */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="contactNumber">
                        Contact Number <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        id="contactNumber"
                        {...register("contactNumber")}
                        placeholder="Enter Branch Contact Number"
                        className="form-control-lg form-control"
                      />
                      {errors.contactNumber && <span className="invalid">{errors.contactNumber.message}</span>}
                    </div>
                  </div>
                </Col>

                {/* WhatsApp Number */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="whatsapp">
                        WhatsApp Number <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        id="whatsapp"
                        {...register("whatsapp")}
                        placeholder="Enter Branch WhatsApp Number"
                        className="form-control-lg form-control"
                      />
                      {errors.whatsapp && <span className="invalid">{errors.whatsapp.message}</span>}
                    </div>
                  </div>
                </Col>

                {/* Address  field */}
                {/* ................................................................................................... */}
                <Col lg="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="address">
                        Full Address <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="address"
                        {...register("address")}
                        placeholder="e.g Street 2E DHA Phase 4"
                        className="form-control-lg form-control"
                      />
                      {errors.address && <span className="invalid">{errors.address.message}</span>}
                    </div>
                  </div>
                </Col>
                {/* Country Field */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="country">
                        Country <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="country"
                        {...register("country")}
                        placeholder="Enter your State/Province"
                        className="form-control-lg form-control"
                      />
                      {errors.country && <span className="invalid">{errors.country.message}</span>}
                    </div>
                  </div>
                </Col>

                {/* State Field */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="state">
                        State/Province <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="state"
                        {...register("state")}
                        placeholder="Enter your State/Province"
                        className="form-control-lg form-control"
                      />
                      {errors.state && <span className="invalid">{errors.state.message}</span>}
                    </div>
                  </div>
                </Col>

                {/* City Field */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="city">
                        City <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="city"
                        {...register("city")}
                        placeholder="Enter Your City"
                        className="form-control-lg form-control"
                      />
                      {errors.city && <span className="invalid">{errors.city.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col xl="12">
                  <Button  className=" text-stone-500" disabled={isLoading} color="primary" size="lg" type="submit">
                    {isLoading ? (
                      <>
                        <Spinner size="sm" color="light" />
                        <span> Loading... </span>
                      </>
                    ) : (
                      "Create branch"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              Skip and <Link to={`/branch-list`}>Goto Branch List</Link>
            </div>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default AddBranch;
