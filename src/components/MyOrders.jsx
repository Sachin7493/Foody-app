import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./MyOrder.module.css";

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
    <div className={styles.container}>
      <h3>My Orders:</h3>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul className={styles.list}>
          {orders.map((order, index) => (
            <li key={index} className={styles.listItem}>
              <div className={styles.order}>
                <img src={order.img} alt={order.name} />
              </div>
              <div className={styles.order2}>
                <h5>{order.name}</h5>
                <p>Quantity:{order.qty}</p>
                <p>Size:{order.size}</p>
                <p>Price: ₹{order.price}</p>
                <div className={styles.cancelContainer}>
                  <button
                    className={styles.btn}
                    onClick={() => handleCancel(order.name)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.btn2}>
        <button className={styles.primary} onClick={handleGoToShopping}>
          Go to Shopping
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
