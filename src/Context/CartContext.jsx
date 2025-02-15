import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();
export default function CartContextProvider(props) {
  const [CartId, setCartId] = useState(0);
  const [CartItem, setCartItem] = useState(0);

  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addProductToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function getProduct() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        console.log(response.data.data.cartOwner, "gett cart product");
        setCartId(response?.data?.cartId);
        setCartItem(response?.data?.numOfCartItems);

        return response;
      })

      .catch((error) => error);
  }

  useEffect(() => {
    getProduct();
  }, []);

  function updataquantity(id, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: newCount },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function removeProduct(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }
  function clearAllCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function Checkout(cartId, url, data) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: data },
        { headers }
      )
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getProduct,
        updataquantity,
        removeProduct,
        Checkout,
        CartId,
        clearAllCart,
        CartItem,
        setCartItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
