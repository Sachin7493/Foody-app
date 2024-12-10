import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useCartItemCount } from "./ContextReducer";
import "./Navbar.css";

const Navbar = () => {
  const cartItemCount = useCartItemCount();
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-brand-container">
          <Link className="navbar-brand fs-2 fst-italic fw-bold" to="/">
            Foody
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="btn bg-white text-success mx-1 mt-3" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link
                  className="btn bg-white text-success mx-1 mt-3"
                  to="/myorders"
                >
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          <div className="ms-auto d-flex">
            {!localStorage.getItem("authToken") ? (
              <>
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="btn bg-white text-success mx-2 mt-1"
                  style={{ width: "120px" }}
                  to="/cart"
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {cartItemCount}
                  </Badge>
                </Link>
                <div
                  className="btn bg-white text-danger mx-2 mt-1"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
