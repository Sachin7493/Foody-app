import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "./Log.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/api/loginuser", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          localStorage.setItem("authToken", response.data.authToken);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.main}>Login</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            autoComplete="off"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Password">Password:</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              id="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={styles.toggleIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
          </div>
          <button className={styles.nom} type="submit">
            Submit
          </button>
          <Link to="/forgotPassword">Forgot Password?</Link>
          <p>
            Don't hava an Account? <Link to="/createuser">Signup</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
