import React, { useState } from "react";
import { useEffect } from "react";
import { useApiHook } from "utils/api";
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
import { useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { toast } from 'react-toastify';
const addUser = () => {
  const [errorVal, setErrorValue] = useState("");
  const { useApi, isLoading } = useApiHook();
  const [branchModalData, setBranchModalData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const openModal = (branch) => {
    setBranchModalData(branch);
    setModalOpen(true); 
  };
  
  const onFormSubmit = (formData) => {
  
  };
  
  
  return (
    <div>
      <Head title="User List" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Add User</BlockTitle>
              <BlockDes className="text-soft">Manage your Users</BlockDes>
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
                {/* <Icon name="alert-circle" /> {errorVal} */}
              </Alert>
            </div>
          )}
          <div className="flex">
            <Form className="is-alter  w-50" onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="flex flex-col g-4">
                <Col lg="11">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="username">
                        Username <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="username"
                        {...register("username")}
                        placeholder="Enter username"
                        className="form-control-lg form-control"
                      />
                      {errors.username && <span className="invalid">{errors.username.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col lg="11">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="email">
                        Email <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="Email"
                        {...register("email")}
                        placeholder="Enter email"
                        className="form-control-lg form-control"
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col lg="11">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="password">
                        Password <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder="Enter password"
                        className="form-control-lg form-control"
                      />
                      {errors.password && <span className="invalid">{errors.password.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col xl="11">
                  <Button className=" text-stone-500" disabled={isLoading} color="primary" size="lg" type="submit">
                    {isLoading ? (
                      <>
                        <Spinner size="sm" color="light" />
                        <span> Loading... </span>
                      </>
                    ) : (
                      "Add User"
                    )}
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

export default addUser;
