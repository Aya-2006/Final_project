import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function ForgetPassword() {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [ApiError, setApiError] = useState("");

  function handelForgetPassword(email) {
    setisLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        email
      )
      .then((response) => {
        console.log(response);
        if (response.data.statusMsg === "success") {
          setisLoading(false);
          navigate("/verfiycode");
        }
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  }

  let validation = yup.object().shape({
    email: yup
      .string()
      .email("email is not valid")
      .required("email is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validation,
    onSubmit: handelForgetPassword,
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">please enter your email</h2>
      <form onSubmit={formik.handleSubmit}>
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
          {formik.errors.email && formik.touched.email ? (
            <div
              className="b-4 mb-4 mt-2 text-sm p-4 rounded-md border-[1px] border-red-400 text-red-800 bg-red-200"
              role="aleart"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-4 text-center  "
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "send"}
        </button>
      </form>
    </div>
  );
}
