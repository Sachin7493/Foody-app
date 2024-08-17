import React, { useState, useEffect } from "react";
import axios from "axios";

const Carousel = ({ onSearch }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/data/foodCategory.json");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchCategories();
  }, []);
  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const imageStyle = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  };
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-success text-white bg-success"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="/asset/2.jpg"
              className="d-block w-100"
              alt="Burger"
              style={imageStyle}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/asset/3.jpg"
              className="d-block w-100"
              alt="Pizza"
              style={imageStyle}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/asset/4.jpg"
              className="d-block w-100"
              alt="Paneer"
              style={imageStyle}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
