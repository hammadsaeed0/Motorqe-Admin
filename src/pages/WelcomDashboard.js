import React from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import logo from "../images/logo.png"

const WelcomDashboard = ({ ...props }) => {
  return (
    <React.Fragment>
      <Head title="Blank Page" />
      <Content>
    <div className=" d-flex flex-column align-center">
    <div className="">
      <img className="  w-36" src={logo}></img>
      </div>

        <div><h1 className="text-center fw-bold mt-5" >
  Welcome To <span className="text-danger">Utaren</span> Dashboard
</h1></div>
     
    </div>
      </Content>
    </React.Fragment>
  );
};

export default WelcomDashboard;
