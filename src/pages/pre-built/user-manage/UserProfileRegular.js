import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import { Alert, Card } from "reactstrap";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import api, { useApiHook } from "utils/api";
import { useForm } from "react-hook-form";
import { Modal, ModalBody } from "reactstrap";
import { toast } from "react-toastify";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  Button,
  RSelect,
} from "../../../components/Component";
import { countryOptions, userData } from "./UserData";
import { getDateStructured } from "../../../utils/Utils";
import UserProfileAside from "./UserProfileAside";
import axios from "axios";
import config from "config/constant";

const UserProfileRegularPage = () => {
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const { useApi, isLoading } = useApiHook();
  const [modalTab, setModalTab] = useState("1");
  const [apiData, setApiData] = useState(null);
  const [userInfo, setUserInfo] = useState(userData[0]);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);

  const confpass = watch("confpass");
  const newPassword = watch("newPassword");
  const currentPassword = watch("currentPassword");
  const token = localStorage.getItem("token");

  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };
  const getId = localStorage.getItem("adminid");
  useEffect(() => {
    useApi.get(`api/admin/auth/getAdminById/${getId}`).then((response) => {
      setApiData(response);
      console.log("useEffect:", response);
    });
  }, []);
  useEffect(() => {
    viewChange();
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    document.getElementsByClassName("nk-header")[0].addEventListener("click", function () {
      updateSm(false);
    });
    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    if (confpass !== newPassword) {
      toast.error("New password and confirm password must match!\nPlease try again.");
    }
    //  useApi.put(`/api/admin/auth/reset/${apiData._id}`,token,newPassword,currentPassword)
    //  .then((response)=>{
    //   console.log(response)
    //  })

    axios
      .put(`${config.base_url}/api/admin/auth/reset/`, { currentPassword, newPassword },{
        headers:{
          Authorization:token
        }
      })
      .then((response) => {
        console.log(response);
        toast.success("Success Fully Password Chnaged")
      })
      .catch((error) => {
        if (error.response && error.response.status == 402) {
          toast.error("current Password is incorrect");
        }
        // Handle error response
        console.log("Error updating password:", error);
        // toast.error("Failed to update password. Please try again.");
      });

    // Handle successful response (if needed)
  };

  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>
      <Content>
        <Card className="card-bordered">
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                sm ? "content-active" : ""
              }`}
            >
              <UserProfileAside updateSm={updateSm} sm={sm} />
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}
              <BlockHead size="lg">
                <BlockBetween>
                  <BlockHeadContent>
                    <BlockTitle tag="h4">Personal Information</BlockTitle>
                    <BlockDes>
                      <p>Basic info, like your Name Email and password</p>
                    </BlockDes>
                  </BlockHeadContent>
                  <BlockHeadContent className="align-self-start d-lg-none">
                    <Button
                      className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
                      onClick={() => updateSm(!sm)}
                    >
                      <Icon name="menu-alt-r"></Icon>
                    </Button>
                  </BlockHeadContent>
                </BlockBetween>
              </BlockHead>

              <Block>
                <div className="nk-data data-list">
                  <div className="data-head">
                    <h6 className="overline-title">Basics</h6>
                  </div>
                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">Name</span>
                      <span className="data-value">{apiData?.name}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                  <div className="data-item">
                    <div className="data-col">
                      <span className="data-label"> Email</span>
                      <span className="data-value">{apiData?.email}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more disable">
                        <Icon name="lock-alt"></Icon>
                      </span>
                    </div>
                  </div>
                  <div className="data-item" onClick={() => setModal(true)}>
                    <Button className="btn-primary">Chane password</Button>
                  </div>
                </div>
              </Block>

              <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
                <a
                  href="#dropdownitem"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModal(false);
                  }}
                  className="close"
                >
                  <Icon name="cross-sm"></Icon>
                </a>
                <ModalBody>
                  <div className="p-2">
                    <h5 className="title">Update Profile: {apiData?._id}</h5>
                    <ul className="nk-nav nav nav-tabs">
                      <li className="nav-item">
                        <a
                          className={`nav-link ${modalTab === "1" && "active"}`}
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModalTab("1");
                          }}
                          href="#personal"
                        >
                          Personal
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Row className="gy-4">
                            {/* Full Name */}
                            {/* <Col md="6"> 
                            <div className="form-group">
                              <label className="form-label" htmlFor="full-name">
                                Full Name
                              </label>
                              <input
                               type="text"
                               id="full-name"
                               className="form-control"
                               name="name"
                               defaultValue={apiData?.name}
                               placeholder="Email"
                                  {...register('name', {
                                    required: 'Name is Requires',
                                  })}
                                />{errors.name && <p>{errors.name.message}</p>},
                            </div>
                        </Col> */}

                            {/* <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="full-name">
                                Email
                              </label>
                              <input
                               type="email"
                               id="email"
                               className="form-control"
                               name="name"
                               onChange={(e) => onInputChange(e)}
                               defaultValue={apiData?.email}
                               placeholder="Email"
                                  {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: 'Invalid email address',
                                      
                                    },
                                  })}
                                />{errors.email && <p>{errors.email.message}</p>},
                            </div>
                        </Col> */}

                            <Col md="6">
                              <div className="form-group">
                                <label className="form-label" htmlFor="currentPassword">
                                  Current Password
                                </label>
                                <input
                                  type="password"
                                  id="currentPassword"
                                  className="form-control"
                                  name="currentPassword"
                                  defaultValue={""}
                                  placeholder="Current Password"
                                  {...register("currentPassword", {
                                    required: "Name is Requires",
                                  })}
                                />
                                {errors.name && <p>{errors.currentPassword.message}</p>},
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="form-group">
                                <label className="form-label" htmlFor="newPassword">
                                  New Password
                                </label>
                                <input
                                  type="password"
                                  id="newPassword"
                                  className="form-control"
                                  name="newPassword"
                                  defaultValue={""}
                                  placeholder="New Password"
                                  {...register("newPassword", {
                                    required: "Name is Requires",
                                  })}
                                />
                                {errors.name && <p>{errors.newPassword.message}</p>},
                              </div>
                            </Col>

                            <Col md="6">
                              <div className="form-group">
                                <label className="form-label" htmlFor="confpass">
                                  Confirm Password
                                </label>
                                <input
                                  type="password"
                                  id="confpass"
                                  className="form-control"
                                  name="confpass"
                                  defaultValue={""}
                                  placeholder="Confirm Password"
                                  {...register("confpass", {
                                    required: "Name is Requires",
                                  })}
                                />
                                {errors.name && <p>{errors.confpass.message}</p>},
                              </div>
                            </Col>
                            <Col size="12">
                              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                <li>
                                  <Button color="primary" size="lg" type="submit">
                                    Update Profile
                                  </Button>
                                </li>
                                <li>
                                  <a
                                    href="#dropdownitem"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      setModal(false);
                                    }}
                                    className="link link-light"
                                  >
                                    Cancel
                                  </a>
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </form>
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </Card>
      </Content>
    </React.Fragment>
  );
};

export default UserProfileRegularPage;
