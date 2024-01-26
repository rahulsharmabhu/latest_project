import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import CInput from "../../../components/custom-input";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
import { signinFormValidation } from "./validation";
import { loginAction } from "../../../app-redux/auth/authActions";
import {
  resetErrorAction,
  selectAuthError,
  selectStatus,
} from "../../../app-redux/auth/authSlice";
import Alert from "../../../components/alert";
import Logo from "../../../assets/images/logo.svg";

function Signin() {
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState({});
  const [isFormik, setIsFormik] = useState(true);
  const [message, setMessage] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [loader, showLoader] = useState(false);

  let error = useAppSelector(selectAuthError);
  const authStatus = useAppSelector(selectStatus);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinFormValidation,
    onSubmit: (values) => {
      const model = {
        email: values.email,
        password: values.password,
      };
      dispatch(loginAction(model));
    },
  });

  useEffect(() => {
    if (authStatus === "loading") showLoader(true);
    else showLoader(false);
  }, [authStatus]);

  useEffect(() => {
    dispatch(resetErrorAction());
  }, []);

  useEffect(() => {
    if (error && error.error) {
      let err = error.error;
      if (err && typeof err == "string") {
        setMessages(null);
        setMessage({ error_msg: err, status: "danger" });
        setIsFormik(false);
      }
    } else setMessages(null);
  }, [error]);

  useEffect(() => {
    setIsFormik(true);
  }, [formik.errors]);

  return (
    <div className="container vh-100 d-grid c-login bg-primary">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="row">
            <form
              className="card shadow bg-white"
              onSubmit={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="card-body p-5">
                <div className="row mb-3">
                  <img src={Logo} alt="Logo" className="w-50" />
                </div>

                {/* <h2 className="card-title mb-3">Login to your account</h2> */}
                <legend className="fs-3 font-weight-bold mb-3">
                  Login to your account
                </legend>
                <div className="row mb-3">
                  {message && (
                    <Alert title={message.error_msg} type={message.status} />
                  )}
                  <div className="col-md-12 col-xl-12">
                    <label className="form-label">Username</label>
                    <div className="input-group">
                      <CInput
                        placeholder="Your username"
                        id="email"
                        className="login-input form-control border"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          isFormik
                            ? { type: "formik", error: formik && formik }
                            : { type: "server", error: messages }
                        }
                        type="email"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12 col-xl-12">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <CInput
                        placeholder="Your password"
                        id="password"
                        name="password"
                        className="login-input form-control border"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          isFormik
                            ? { type: "formik", error: formik && formik }
                            : { type: "server", error: messages }
                        }
                        type="password"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-7 col-xl-7">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexCheckDefault"
                        value=""
                        id="flexCheckDefault"
                        
                      />
                      <label
                        className="form-check-label small"
                        for="flexCheckDefault"
                      >
                        Keep me login for 30 days
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5 col-xl-5 text-end">
                    <span className="form-label-description">
                      <a
                        className="text-decoration-none"
                        href="/auth/forgot-password"
                      >
                        {" "}
                        Forgot Password?
                      </a>
                    </span>
                  </div>
                </div>
                <div className="form-footer mb-3">
                  <button
                    type="submit"
                    className={`btn btn-primary w-100 ${
                      disabled ? "disabled" : ""
                    }`}
                  >
                    Login
                  </button>
                  <div className="mt-2">
                    <span>Don't have an account? </span>
                    {/* <button className="text-primary">Sign up</button>    */}
                    <a className="text-decoration-none" href="/auth/signup">
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signin;
