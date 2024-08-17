import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Axios from "axios";
import foodCategory from "../assets/foodCategory.json";

const Home = () => {
  const [foodData, setFoodData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/api/foodData");
        setFoodData(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching from items:", error);
      }
    };
    fetchFoodItems();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredItems(foodData);
    } else {
      const filtered = foodData.filter((item) =>
        item.CategoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const renderCategoryItems = (categoryName) => {
    const categoryItems = filteredItems.filter(
      (item) => item.CategoryName === categoryName
    );
    if (categoryItems.length > 0) {
      return (
        <div key={categoryName}>
          <h3 className="mt-4">{categoryName}</h3>
          <hr />
          <div className="row">
            {categoryItems.map((item, index) => (
              <div key={index} className="col-md-4">
                <Card item={item} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Navbar />
      <Carousel onSearch={handleSearch} />
      <div className="container mt-3">
        {foodCategory.map((category) => (
          <div key={category.CategoryName}>
            {renderCategoryItems(category.CategoryName)}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

/*import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Axios from "axios";


const Home = () => {
  const [foodData, setFoodData] = useState([]);
  const [filterItem, setFilterItem] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/api/foodData");
        setFoodData(response.data);
        setFilterItem(response.data);
      } catch (error) {
        console.error("Error fetching from items:", erorr);
      }
    };
    fetchFoodItems();
  }, []);
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilterItem(foodData);
    } else {
      const filtered = foodData.filter((item) =>
        item.CategoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterItem(filtered);
    }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel onSearch={handleSearch} />
      </div>
      <div className="container">
        <div className="m-3 ">
          {/*<div className="row">
          {foodData.map((item, index) => (
            <div className="col-md-4" key={index}>
              <Card item={item} />
            </div>
          ))}
        </div>/*}
          <div className="row">
            {filterItem.map((item, index) => (
              <div className="col-md-4" key={index}>
                <Card key={item._id} item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;*/
