import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle } from "../../components/Component";
import api from "utils/api";
import config from "config/constant";

const VerifyEmail = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
  
      if (!token) {
        setError("Token is missing");
        return;
      }
  
      axios
        .get(`${config.base_url}/api/auth/verify-email/?token=${token}`)
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setError("Invalid token");
          } else {
            setError("Error verifying email");
          }
        });
    };
  
    verifyEmail();
  }, []);

  return (
    <>
      <Head title="Success" />
      <Block className="nk-block-middle nk-auth-body">
        <div className="brand-logo pb-5">
          <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
          </Link>
        </div>
        <BlockHead>
          <BlockContent>
            <BlockTitle tag="h1" className="h2">Eメールアドレスの認証が完了しました</BlockTitle>
            {message && <p className="text-success h3">{message}</p>}
            {error && <p className="text-danger h3">{error}</p>}
          </BlockContent>
        </BlockHead>
      </Block>
    </>
  );
};

export default VerifyEmail;
