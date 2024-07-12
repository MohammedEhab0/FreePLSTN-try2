import React from "react";
import { Link } from "react-router-dom";
import "./Login-Registration.css";
import Lottie from "lottie-react";
import LoginAnime from "../../images/fqB9DVSy6f.json";

const RegistrationPage = () => (
  <div className="register-container">
    <form className="form-group">
      <h2>Register</h2>

      <div className="rl-images">
        <Lottie animationData={LoginAnime} loop={true} />
      </div>
      <div className="social-signup"></div>
      <div>
        <input type="text" name="name" required placeholder="Full Name" />
      </div>
      <div>
        <input type="email" name="email" required placeholder="email" />
      </div>
      <div>
        <input
          type="password"
          name="password"
          required
          placeholder="password"
        />
      </div>
      <div>
        <input
          type="password"
          name="confirmPassword"
          required
          placeholder="confirmPassword"
        />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>
      Already have an account?{" "}
      <Link to="/login" className="landing-button">
        Login
      </Link>
    </p>
  </div>
);

export default RegistrationPage;
