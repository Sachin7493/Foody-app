import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Forgot.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/api/forgot-password", {
      email,
    })
      .then((response) => {
        if (response.data.status) {
          alert("check your email for reset password link");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.main}>Forgot Password:</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            autoComplete="off"
            placeholder="email.."
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.last} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
