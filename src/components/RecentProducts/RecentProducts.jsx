import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from '../../Context/WishContext';

export default function RecentProducts() {
  let { data, isError, error, isLoading } = useProducts();
  let { addProductToCart,  setCartItem, CartItem  } = useContext(CartContext);
  let { addProductToWishList, deleteProductFromWishList } = useContext(WishContext);

  const [Loading, setLoading] = useState(false)

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
      return new Set(storedWishlist || []);
    } catch (error) {
      console.error("Error parsing wishlist from localStorage:", error);
      localStorage.removeItem("wishlist"); 
      return new Set();
    }
  })
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify([...wishlistItems]));
  }, [wishlistItems, searchTerm]);

  async function toggleWishList(id) {
    setLoading(true)
    if (wishlistItems.has(id)) {

      let res = await deleteProductFromWishList(id);
      if (res?.data?.status === "success") {
        setWishlistItems((prev) => {
          const newWishlist = new Set(prev);
          newWishlist.delete(id);
          localStorage.setItem("wishlist", JSON.stringify([...newWishlist]));
          setLoading(false)
          return newWishlist;
        });
      } else {
        toast.error("error when added to wishlist");
        setLoading(false);
      }
    } else {

      let res = await addProductToWishList(id);
      if (res?.data?.status === "success") {
        setWishlistItems((prev) => {
          const newWishlist = new Set([...prev, id]);
          localStorage.setItem("wishlist", JSON.stringify([...newWishlist]));
          setLoading(false)
          toast.success(res.data.message)
          return newWishlist;
        });
      } else {
        toast.error("error when added to wishlist"),

        setLoading(false)
      }
    }
  }

  const [currentId, setcurrentId] = useState(0);
  async function addToCart(id) {
    setLoading(true)
    let response = await addProductToCart(id);

    if (response?.data?.status == "success") {
      setCartItem(CartItem + 1);
      console.log(response.data);

      toast.success(response.data.message);

      setLoading(false)

    }
    else {


      toast.error(response.data.message);
      setLoading(false)
    }
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
      <div className='text-center mt-4'>
        <input
          type="text"
          placeholder="search"
          className="w-3/4 m-auto my-8 border-2 border-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className=" row">


        {filteredProducts?.map((product) => (<div key={product.id} className=' md:w-1/2  lg:w-1/4'>

          <div className='product text-left p-4 '>
            <div className='hover:shadow-lg hover:shadow-emerald-600'>
              <Link to={`productdetails/${product.id}/${product.category.name}`} >
                <img src={product.imageCover} className='w-full' />
                <h3 className='text-emerald-600 pl-3'>{product.category.name}</h3>
                <h3 className='mb-3 pl-3'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <div className='flex justify-between p-3'>
                  <span>{product.price}EGP</span>
                  <span > <i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage
                  }</span>
                </div>
              </Link>
              <div className='flex flex-wrap justify-between items-center p-3 gap-2'>
                <button onClick={() => addToCart(product.id)} className=' w-3/4 btn'>add to cart</button>
                <i
                  onClick={() => toggleWishList(product.id)}
                  className={`fa-solid fa-heart cursor-pointer text-2xl ${wishlistItems.has(product.id) ? 'text-red-500' : 'text-gray-400'
                    }`}
                ></i>
              </div>
            </div>




          </div>




        </div>))}
      </div>
    </div>
  </>
  );
}
