import React, { useState, useEffect } from "react";
import { useDispatchCart } from "./ContextReducer";

const Card = ({ item }) => {
  const { name, img, options } = item;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const dispatch = useDispatchCart();

  useEffect(() => {
    if (options && options.length > 0) {
      const validSizes = Object.keys(options[0]).filter((key) => key !== "_id");
      if (validSizes.length > 0) {
        const initialSize = validSizes[0];
        setSize(initialSize);
        setFinalPrice(options[0][initialSize] * qty);
      }
    }
  }, [options, qty]);

  useEffect(() => {
    if (options && options.length > 0 && size) {
      setFinalPrice(options[0][size] * qty);
    }
  }, [size, qty, options]);

  const handleAddTCart = () => {
    const itemToAdd = {
      ...item,
      qty,
      size,
      price: options[0][size] * qty,
    };
    dispatch({ type: "ADD", item: itemToAdd });
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "480px" }}>
        <img
          src={img}
          className="card-img-top"
          alt={name}
          style={{ width: "100%", height: "180px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <div className="container w-100 mb-3">
            <select
              className="m-2 h-100 bg-success rounded"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {options &&
                options.length > 0 &&
                Object.keys(options[0])
                  .filter((key) => key !== "_id")
                  .map((key, i) => (
                    <option key={i} value={key}>
                      {key} - {options[0][key]}
                    </option>
                  ))}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}</div>
          </div>
          <hr />
          <button className="btn btn-success mt-auto" onClick={handleAddTCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
