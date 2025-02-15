import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { jwtDecode } from 'jwt-decode';

export default function Allorders() {
  let decoded;
  const [allOrders, setAllOrders] = useState([]);

  const token = localStorage.getItem("userToken"); 
  if (token) {
      try {
       decoded = jwtDecode(token);
          console.log("User ID:", decoded.id);
      } catch (error) {
          console.error("Invalid Token:", error);
      }
   } else {
       console.error("No Token Found!");
  }
    
  function getUserAllOrders(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((response) => {
        console.log(response?.data, "userorder");
        setAllOrders(response?.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
   
    getUserAllOrders(decoded.id)
  }, []);

  return (
    <div>
      <h2 className="text-center capitalize text-2xl mb-3 font-semibold ">Orders List</h2>
      {allOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {allOrders.map((order, index) => (
            <li key={index} className="border p-4 mb-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg text-emerald-600 text-center">
                Order #{index + 1} - Total: ${order.totalOrderPrice}
              </h3>
              <p>Payment Method: {order.paymentMethodType}</p>

            
              {order.cartItems && order.cartItems.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  {order.cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 border p-2 rounded-md">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <div>
                        <p className="font-semibold">{item.product.title}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-500 mt-2">No products found in this order.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
