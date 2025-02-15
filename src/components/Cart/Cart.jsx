import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartProduct, setCartProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let {
    getProduct,
    updataquantity,
    removeProduct,
    clearAllCart,
    CartItem,
    setCartItem,
  } = useContext(CartContext);

  async function getProdectToCart() {
    setIsLoading(true);
    let res = await getProduct();
    if (res?.data?.status === "success") {
      console.log(res.data.data, "get");
      setCartProduct(res?.data?.data);
      setIsLoading(false);
    }
  }

  async function clearYourCart() {
    setLoading(true);
    let res = await clearAllCart();
    console.log(res, "clear");
    if (res?.data?.message === "success") {
      setCartItem(0);

      setCartProduct(res?.data?.data);
      navigate("/");
      setLoading(false);
    }
  }

  async function updataProductQuantity(id, count) {
    setLoading(true);
    let res = await updataquantity(id, count);

    console.log(res, "update");

    if (res?.data?.status === "success") {
      setCartProduct(res?.data?.data);
      toast.success("updated successfully.");

      setLoading(false);
    }
  }

  async function deleteItem(id) {
    setLoading(true);
    let res = await removeProduct(id);
    if (res?.data?.status === "success") {
      console.log(res.data.status, "delete");
      setCartItem(CartItem - 1);
      setCartProduct(res?.data?.data);
      toast.success("Deleted successfully.");

      setLoading(false);
    } else {
      toast.error("can not delete");
      setLoading(false);
    }
  }

  useEffect(() => {
    getProdectToCart();
  }, []);

  return (
    <>
      <div className="relative">
        {Loading && (
          <div className="fixed inset-0 bg-gray-800/60  flex justify-center items-center z-50">
            <span className="loader"></span>
          </div>
        )}

        {isLoading ? (
          <div className="fixed inset-0 bg-gray-800/60  flex justify-center items-center z-50">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="  shadow-md sm:rounded-lg bg-gray-100   ">
            <div className="flex justify-between items-center p-3">
              <h2 className="text-black text-2xl  font-semibold   capitalize p-7">
                Cart Shop
              </h2>
              <Link to={`/checkout`}>
                {" "}
                <button className="bg-blue-600 text-white  rounded-md  p-4 ">
                  check out
                </button>
              </Link>
            </div>
            <div className="flex-col flex md:flex-row md:p-1 justify-between items-center p-7  px-3 ">
              <h3 className=" text-2xl capitalize p-4">
                totalPrice:{" "}
                <span className="text-emerald-600">
                  {cartProduct?.totalCartPrice}
                </span>
              </h3>
              <h3 className=" text-2xl capitalize p-4">
                total number of items:{" "}
                <span className="text-emerald-600">{CartItem}</span>
              </h3>
            </div>
            <div className="w-full text-sm text-left rtl:text-right   ">
              {cartProduct?.products.map((pro) => (
                <div
                  key={pro?.product?.id}
                  className=" border-b flex gap-4 flex-col md:flex-row items-center py-4 "
                >
                  <div className="md:w-1/4 ">
                    <div className="ml-3">
                      {" "}
                      <img
                        src={pro?.product?.imageCover}
                        className=" w-[100%]   "
                        alt="Apple Watch"
                      />
                    </div>
                  </div>

                  <div className=" py-4 flex justify-between items-center w-[100%]  md:w-3/4 ">
                    <div className="pl-3">
                      <h3 className="text-black text-2xl  font-semibold  capitalize">
                        {" "}
                        {pro?.product?.title}
                      </h3>
                      <h4 className="text-emerald-600 font-semibold py-3 text-xl ">
                        {pro.price} EGP
                      </h4>
                      <h5
                        onClick={() => deleteItem(pro?.product?.id)}
                        className="text-red-600 cursor-pointer text-xl"
                      >
                        {" "}
                        <i className="fa-solid fa-trash "></i> remove
                      </h5>
                    </div>
                    <div className="flex items-center px-3">
                      <button
                        onClick={() =>
                          updataProductQuantity(pro.product?.id, pro.count - 1)
                        }
                        className="cursor-pointer  inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-9 w-9 text-gray-500  border border-emerald-600 rounded-md focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span className="text-black">{pro.count}</span>
                      </div>

                      <button
                        onClick={() =>
                          updataProductQuantity(pro?.product?.id, pro.count + 1)
                        }
                        className="cursor-pointer   inline-flex items-center justify-center h-9 w-9 p-1 ms-3 text-sm font-medium text-gray-500  border border-emerald-600 rounded-md focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200     "
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center w-full  py-5">
              <button
                className="border-emerald-600 border-2 p-3 rounded-md"
                onClick={() => clearYourCart()}
              >
                clear yor cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
