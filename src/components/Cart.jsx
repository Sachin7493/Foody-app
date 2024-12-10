import React, { useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styles from "./Cart.module.css";

const Cart = () => {
  const items = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = Number(item.price) || 0;
      return total + price;
    }, 0);
  };
  const handleCheckout = () => {
    setPaymentOpen(true);
  };
  const handlePaymentSuccess = async () => {
    if (!paymentMethod) {
      alert("please select a payment method.");
      return;
    }
    setPaymentSuccessful(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/orderData",
        {
          orderData: items,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Order placed successfully!");
        dispatch({ type: "CLEAR" });
        navigate("/");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response?.status === 401) {
        alert("Session expired.Please log in again");
        navigate("/login");
      } else {
        alert("Failed to place order. Please try again.");
      }
    }
  };
  const handleGoToShopping = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <h3 className={styles.main}>My Cart:</h3>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <div>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      marginRight: "10px",
                    }}
                  />
                </div>
                <div>
                  <h5>{item.name}</h5>
                  <p>Quantity:{item.qty}</p>
                  <p>Size:{item.size}</p>
                  <p>Price:₹{item.price}</p>
                </div>
                <button
                  className={styles.remove}
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <h5>Total Price: ₹{calculateTotalPrice()}</h5>
          </div>
          <div>
            <button onClick={handleCheckout}>Check Out</button>
          </div>
        </div>
      )}
      <div className={styles.shop}>
        <button className={styles.primary} onClick={handleGoToShopping}>
          Go to Shopping
        </button>
      </div>
      <Modal
        isOpen={isPaymentOpen}
        onRequestClose={() => setPaymentOpen(false)}
        contentLabel="Payment Model"
      >
        <h2 style={{ color: "black" }}>Payment:</h2>
        <p style={{ color: "magenta" }}>Select a payment method:</p>
        <div className={styles.middle}>
          <button
            className={styles.card}
            style={{ width: "200px", backgroundColor: "gray" }}
            onClick={() => setPaymentMethod("card")}
          >
            Card Payment
          </button>

          <button
            className={styles.upi}
            style={{ width: "200px", margin: "5px" }}
            onClick={() => setPaymentMethod("upi")}
          >
            UPI Payment
          </button>

          <div style={{ width: "100px" }}>
            <button className={styles.payment} onClick={handlePaymentSuccess}>
              Confirm Payment
            </button>
            <button
              className={styles.cancel}
              onClick={() => setPaymentOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
