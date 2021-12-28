import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import useFirebase from "../hook/useFirebase";
import "./Register.css";

const Register = () => {
  const [loginData, setLoginData] = useState({});

  const { isLoading, registerUser } = useFirebase();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLogin = (e) => {
    if (loginData.password !== loginData.rePassword) {
      swal({
        title: "Greate!",
        text: "Your Password didn't match",
        icon: "warning",
        button: "Try again",
      });
      return;
    }
    registerUser(loginData.email, loginData.password, loginData.name);
    e.preventDefault();
  };
  return (
    <div className="container text-center my-5">
      <h5 className="top-title">
        If You Are New User Please <span className="banner-span">Register</span>{" "}
      </h5>
      <div className="row">
        <div className="col-12">
          <img
            className="signin-img mt-5"
            src="https://i.ibb.co/n3KQMbP/register.png"
            alt=""
          />
        </div>
        <div className="col-12 login-form-container regi-form-container mt-3">
          <div>
            <div className="login-frm">
              {!isLoading && (
                <form onSubmit={handleLogin} className="login-input">
                  <input
                    className="login-input-field mb-4"
                    type="text"
                    name="name"
                    onBlur={handleOnBlur}
                    placeholder="Name"
                  />

                  <input
                    className="login-input-field mb-4"
                    type="email"
                    name="email"
                    onBlur={handleOnBlur}
                    placeholder="Email"
                  />

                  <input
                    className="login-input-field mb-4"
                    type="password"
                    name="password"
                    onBlur={handleOnBlur}
                    placeholder="Password"
                  />
                  <input
                    className="login-input-field mb-4"
                    type="password"
                    name="rePassword"
                    onBlur={handleOnBlur}
                    placeholder="Password"
                  />

                  <button
                    className="login-input-field log-registerBtn my-4"
                    type="submit"
                  >
                    Register
                  </button>

                  <p>
                    Alrady Registerd ? Please{" "}
                    <Link className="login-link-btn" to="/login">
                      Login
                    </Link>
                  </p>
                </form>
              )}
              {isLoading && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
