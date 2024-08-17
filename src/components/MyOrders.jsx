import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/myOrders", {
          withCredentials: true,
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);
  const handleCancel = async (orderName) => {
    if (!orderName) {
      alert("Invalid order name");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/cancel",
        { orderName },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Order cancelled successfully!");
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.name !== orderName)
        );
      }
    } catch (error) {
      console.log(
        "Error cancelling order:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again");
        navigate("/login");
      } else {
        alert("Failed to cancel order.Please try again");
      }
    }
  };
  const handleGoToShopping = () => {
    navigate("/");
  };
  return (
    <div className="container mt-5">
      <h3>My Orders:</h3>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul className="list-group">
          {orders.map((order, index) => (
            <li
              key={index}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center flex-grow-1">
                <img
                  src={order.img}
                  alt={order.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    marginRight: "10px",
                  }}
                />
              </div>
              <div className="d-flex flex-column align-items-start flex-grow-1">
                <h5>{order.name}</h5>
                <p>Quantity:{order.qty}</p>
                <p>Size:{order.size}</p>
                <p>Price: ₹{order.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleCancel(order.name)}
                  style={{
                    marginLeft: "auto",
                    position: "relative",
                    top: "-70px",
                  }}
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 d-flex justify-content-center">
        <button className="btn btn-primary" onClick={handleGoToShopping}>
          Go to Shopping
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
