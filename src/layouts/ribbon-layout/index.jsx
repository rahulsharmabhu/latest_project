import React from "react";
import { ToastContainer } from "react-toastify";
import CustomRibbon from "../../components/ribbon";

const RibbonLayout = (props) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <CustomRibbon />
      {props.component}
    </>
  );
};

export default RibbonLayout;
