import React, { useState } from "react";
import Logo from "../../../../images/logo.png";
import LogoDark from "../../../../images/logo.png";
import Head from "../../../../layout/head/Head";
import AuthFooter from "pages/auth/AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../../../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../../config/constant";
import { toast } from "react-toastify";
// ... (import statements remain unchanged)

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = (formData) => {
    setLoading(true);
    setError("");

    axios
      .post(`${config.base_url}/api/admin/auth/register`, formData)
      .then((res) => {
        setLoading(false);

        const { token, adminemail, adminname } = res.data;
        console.log(res);
        localStorage.setItem("token", token);
        localStorage.setItem("adminemail", res.data.adminemail);
        localStorage.setItem("adminname", res.data.adminname);
        localStorage.setItem("adminid", res.data.adminid);
        localStorage.setItem("AdminType", res.data.adminid);

        toast.success("Successfully Registerd", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      navigate('/dashboard')
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 401) {
          setError("Email is already registerd");
        } else {
          setError("Something Error");
        }
      });
  };
  const role = localStorage.getItem("role");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Head title="Create User" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
          </Link>
        </div>

        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
        {role === 'Super Admin' ? (
        <h1>Super Admin</h1>
      ) : role === 'Admin' 
      }

          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Create Account</BlockTitle>
              <BlockDes></BlockDes>
            </BlockContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> {errorVal}
              </Alert>
            </div>
          )}
        {role === 'Super Admin' ? (
          <form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            {/* Name */}
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Name
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="default-01"
                  {...register("name", { required: "This field is required" })}
                  placeholder="Enter your Name"
                  className="form-control-lg form-control"
                />
                {errors.name && <span className="invalid">{errors.name.message}</span>}
              </div>
            </div>
              {/* Email */}
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="default-01"
                  {...register("email", { required: "This field is required" })}
                  placeholder="Enter your email address"
                  className="form-control-lg form-control"
                />
                {errors.email && <span className="invalid">{errors.email.message}</span>}
              </div>
            </div>
            {/* password */}
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register("password", { required: "This field is required" })}
                  placeholder="Enter your Password"
                  className="form-control-lg form-control"
                />
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <FontAwesomeIcon icon={passState ? faEye : faEyeSlash} />
                </a>
                {errors.password && <span className="invalid">{errors.password.message}</span>}
              </div>
            </div>
           {/* Role */}

           <div className="form-group">

              
           <label htmlFor="cars">Choose a Role Type</label>
      <select id="cars" {...register('role')}
        className="form-control-lg form-control"
        >
        <option value="admin">admin</option>
        <option value="Super Admin">Super Admin</option>
      </select>
                {errors.role && <span className="invalid">{errors.role.message}</span>}
              </div>
          

           {/* -------------------------------------------- */}
            <div className="form-group">
              <Button size="lg" className="btn-block text-stone-500" type="submit" color="primary">
                {loading ? <Spinner size="sm" color="light" /> : "Sign up"}
              </Button>
            </div>
          </form>
          ) : (
            <h1>You are not Super Admin</h1>
          )}
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default CreateUser;
