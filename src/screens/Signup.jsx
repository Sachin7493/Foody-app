import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "./Logout.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState("false");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/api/createuser", {
      name,
      email,
      password,
      location,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Axios error", err);
      });
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.main}>SignUp</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="User"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            autoComplete="off"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Password">Password:</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
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
          <label htmlFor="name">Address:</label>
          <input
            type="text"
            placeholder="Enter Address..."
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className={styles.nom} type="submit">
            Submit
          </button>
          <p>
            Have an Account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
