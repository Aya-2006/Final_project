import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Categories from "../Categories/Categories";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [Categories, setCategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <h2 className="my-3 capitalize font-semibold text-gray-600 text-start">
        shop popular categories
      </h2>
      <Slider {...settings}>
        {Categories.map((category) => (
          <div key={category._id} >
            <img
              src={category.image}
              className="w-full h-[200px] object-cover"
              alt=""
            />
            <h4>{category.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
