import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";

export default function Products() {
  let { addProductToWishList, deleteProductFromWishList } =
    useContext(WishContext);
  let { data, isError, error, isLoading } = useProducts();
  let { addProductToCart, setCartItem, CartItem } = useContext(CartContext);
  const [Loading, setLoading] = useState(false);
  const [currentId, setcurrentId] = useState(0);

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
      return new Set(storedWishlist || []);
    } catch (error) {
      console.error("Error parsing wishlist from localStorage:", error);
      localStorage.removeItem("wishlist");
      return new Set();
    }
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = data?.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify([...wishlistItems]));
  }, [wishlistItems, searchTerm]);

  async function toggleWishList(id) {
    setLoading(true);
    
    if (wishlistItems.has(id)) {
      let res = await deleteProductFromWishList(id);
      if (res?.data?.status === "success") {
        setWishlistItems((prev) => {
          const newWishlist = new Set(prev);
          newWishlist.delete(id);
          localStorage.setItem("wishlist", JSON.stringify([...newWishlist]));
          return newWishlist;
        });
        toast.success(res.data.message);
      } else {
        toast.error("Error removing from wishlist");
      }
    } else {
      let res = await addProductToWishList(id);
      if (res?.data?.status === "success") {
        setWishlistItems((prev) => {
          const newWishlist = new Set([...prev, id]);
          localStorage.setItem("wishlist", JSON.stringify([...newWishlist]));
          return newWishlist;
        });
        toast.success(res.data.message);
      } else {
        toast.error("Error adding to wishlist");
      }
    }
  
    setLoading(false);
  }
  

  async function addToCart(id) {
    setcurrentId(id);
    setLoading(true);

    let response = await addProductToCart(id);
    if (response?.data?.status === "success") {
      setCartItem(CartItem + 1);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    setcurrentId(0);
    setLoading(false);
  }

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return (
      <div className="sk-fading-circle">
        <div className="sk-circle1 sk-circle"></div>
        <div className="sk-circle2 sk-circle"></div>
        <div className="sk-circle3 sk-circle"></div>
        <div className="sk-circle4 sk-circle"></div>
        <div className="sk-circle5 sk-circle"></div>
        <div className="sk-circle6 sk-circle"></div>
        <div className="sk-circle7 sk-circle"></div>
        <div className="sk-circle8 sk-circle"></div>
        <div className="sk-circle9 sk-circle"></div>
        <div className="sk-circle10 sk-circle"></div>
        <div className="sk-circle11 sk-circle"></div>
        <div className="sk-circle12 sk-circle"></div>
      </div>
    );
  }
  // const [products, setproducts] = useState([]);
  // function getProducts() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then((res) => {
  //       setproducts(res.data.data);
  //     })
  //     .catch((res) => {});
  // }
  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <>
      <div className="relative">
        {Loading && (
          <div className="fixed inset-0 bg-gray-800/60  flex justify-center items-center z-50">
            <span className="loader"></span>
          </div>
        )}

        <div className="text-center">
          <input
            type="text"
            placeholder="search"
            className="w-3/4 m-auto my-8 border-2 border-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row">
          {filteredProducts?.map((product) => (
            <div key={product.id} className="w-1/6">
              <div className="product my-2 p-2">
                <Link
                  to={`productdetails/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className=" text-emerald-600">{product.category.name}</h3>
                  <h3 className="font-semibold mb-1">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button onClick={() => addToCart(product.id)} className="btn">
                  {Loading && currentId == product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    " Add to Cart "
                  )}
                </button>
                <i
                  onClick={() => toggleWishList(product.id)}
                  className={`fa-solid fa-heart cursor-pointer text-2xl ${
                    wishlistItems.has(product?.id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
