import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";

export default function ResetPassword() {
  const navagite = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [ApiError, setApiError] = useState("");
  let { userLogin, setuserLogin } = useContext(UserContext);

  function handelResetPassword(value) {
    setisLoading(true);
    console.log("Sending data:", value);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("userToken", res.data.token);
        setuserLogin(res.data.token);
        setisLoading(false);
        navagite("/");
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handelResetPassword,
  });

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">
        reset your account password
      </h2>
      <form onSubmit={formik.handleSubmit} className=" ">
        <div className="relative z-0 w-full mb-8 group ">
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
      border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your email
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group ">
          <input
            type="password"
            id="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
      border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your password
          </label>
        </div>
        <div className="flex gap-4 items-center ">
          <button
            type="submit"
            className="text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
