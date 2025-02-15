import React, { useContext, useEffect, useState } from "react";
import { WishContext } from "../../Context/WishContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishList() {
  const [wishList, setWishList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);

  let { getProductFromWishList, deleteProductFromWishList } =
    useContext(WishContext);
  let { addProductToCart, CartItem, setCartItem } = useContext(CartContext);
  const [wishlistItems, setWishlistItems] = useState(
    new Set(JSON.parse(localStorage.getItem("wishlist")) || [])
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify([...wishlistItems]));
  });

  async function addToCart(id) {
    setLoading(true);
    let response = await addProductToCart(id);

    if (response?.data?.status == "success") {
      setCartItem(CartItem + 1);
      console.log(response.data);

      toast.success(response.data.message);
      await deleteItem(id);
      setLoading(false);
    } else {
      toast.error("error when added to cart");
      setLoading(false);
    }
  }

  async function getWishList() {
    setIsLoading(true);
    let res = await getProductFromWishList();

    if (res?.data?.status == "success") {
      setWishList(res.data);
      setIsLoading(false);
    }
  }

  async function deleteItem(id) {
    setLoading(true);
    let res = await deleteProductFromWishList(id);
    if (res?.data?.status === "success") {
      toast.success(res.data.message);

      setWishlistItems((prev) => {
        const newWishlist = new Set(prev);
        newWishlist.delete(id);
        localStorage.setItem("wishlist", JSON.stringify([...newWishlist]));
        setLoading(false);
        return newWishlist;
      });

      await getWishList();
    }
  }

  useEffect(() => {
    getWishList();
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
          <div className=" w-full overflow-x-auto shadow-md sm:rounded-lg  bg-gray-100  md:p-7">
            <div className="min-w-full text-sm text-left rtl:text-right  ">
              <h2 className="text-black text-2xl  font-bold   capitalize p-7">
                My wish List
              </h2>
              <div>
                {wishList?.data.map((pro) => (
                  <div
                    key={pro.id}
                    className=" border-b flex flex-col justify-center items-center pb-2 gap-4  md:flex-row md:justify-between md:items-center  "
                  >
                    <div className="w-[100%] md:w-1/4">
                      <div>
                        {" "}
                        <img
                          src={pro?.imageCover}
                          className=" w-[100%]  "
                          alt="Apple Watch"
                        />
                      </div>
                    </div>

                    <div className=" py-4 flex justify-between items-center w-[100%]  md:w-3/4 ">
                      <div className="pl-3">
                        {" "}
                        <h3 className="text-black text-xl  font-semibold  capitalize">
                          {" "}
                          {pro?.title}
                        </h3>
                        <h4 className="text-emerald-600 font-semibold py-2">
                          {pro.price} EGP
                        </h4>
                        <h5
                          onClick={() => deleteItem(pro.id)}
                          className="text-red-600 capitalize cursor-pointer "
                        >
                          {" "}
                          <i class="fa-solid fa-trash"></i> remove
                        </h5>
                      </div>
                      <button
                        onClick={() => addToCart(pro.id)}
                        className="p-3 text-black border border-emerald-400"
                      >
                        add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
