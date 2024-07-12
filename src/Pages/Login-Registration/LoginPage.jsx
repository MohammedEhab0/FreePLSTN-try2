// LoginPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginAnime from "../../images/fqB9DVSy6f.json";
import { FaGoogle } from "react-icons/fa6";
import "./Login-Registration.css";
import Lottie from "lottie-react";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [name, setName] = useState("");

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="login-container">
      <form className="form-group">
        <h2>Sign In</h2>
        <div className="rl-images">
          <Lottie animationData={LoginAnime} loop={true} />
        </div>
        <div className="social-signup"></div>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="full-name"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={changeInputHandler}
          required
          className="Email"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={changeInputHandler}
          required
          className="password"
        />
        <button type="submit" className="btn primary lo">
          Login
        </button>
      </form>
      <small>
        You Don't have an account?
        <Link to="/register" className="landing-button">
          {" "}
          Register
        </Link>
      </small>
    </div>
  );
};

export default LoginPage;
