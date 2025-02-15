import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { Checkout, CartId } = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: () => handelCheckout(CartId, `http://localhost:5173`),
  });

  async function handelCheckout(cartId, url) {
    let res = await Checkout(cartId, url, formik.values);
    console.log(res, "handel checkout");
    window.location.href = res?.data?.session?.url;
  }

  return (
    <>
      <h2 className="font-bold text-2xl text-emerald-600 text-center my-4">
        checkout Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="px-20">
        <div className="relative z-0 w-full mb-8 group ">
          <input
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
      border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your details
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group ">
          <input
            type="text"
            id="phone"
            name="phone"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
      border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your phone
          </label>

          {formik.errors.password && formik.touched.password ? (
            <div
              className="b-4 mb-4 text-sm rounded-lg text-red-800"
              role="aleart"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group ">
          <input
            type="text"
            id="city"
            name="city"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
      border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your city
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="text-emerald-600 hover:text-white transition-all border-2 border-emerald-400 w-full bg-white hover:bg-emerald-600   font-medium rounded-lg text-sm  px-5 py-4 my-3 text-center  "
          >
            Checkout
          </button>
        </div>
      </form>
    </>
  );
}
