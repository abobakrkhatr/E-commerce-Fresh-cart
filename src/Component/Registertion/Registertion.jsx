import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../../UserContext/UserContext";
import { motion } from "framer-motion";

export default function Registertion() {
  let { setUserLogin, setUserData } = useContext(UserContext);

  let Navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "name minlength is 3")
      .max(10, "name maxlength is 10")
      .required("name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone must be valid in egyption")
      .required("phone is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must be valid Upercase")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "repassword & password must be valid Upercase"
      )
      .required("rePassword is required"),
  });

  function handleRegister(formValue) {
    setIsLoding(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValue)
      .then((apiRespones) => {
        Navigate("/login");
        setIsLoding(false);
        // console.log(apiRespones?.data?.user?.email);
      })
      .catch((error) => {
        setIsLoding(false);
        // console.log(error);
        setApiError(error?.response?.data?.message);
      });
    // console.log(formValue);
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,

    onSubmit: handleRegister,
  });
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="my-5 mt-20 w-3/4 mx-auto bg-gray-50 shadow-lg rounded bg-asset p-5"
      >
        <div className="py-6  max-w-xl mx-auto">
          {apiError ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {apiError}
            </div>
          ) : null}

          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Register Now
          </h2>
          <form onSubmit={formik.handleSubmit} className="  ">
            <div className="relative z-0 w-full mb-5 group">
              <label
                className="block text-medium font-medium text-gray-900 mb-1"
                htmlFor="currentPassword"
              >
                Name :
              </label>

              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder=" "
              />
            </div>
            {formik.errors.name && formik.touched.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            ) : null}

            <div className="relative z-0 w-full mb-5 group">
              <label
                className="block text-medium font-medium text-gray-900 mb-1"
                htmlFor="currentPassword"
              >
                email :
              </label>

              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder=" "
              />
            </div>

            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}

            <div className="relative z-0 w-full mb-5 group">
              <label
                className="block text-medium font-medium text-gray-900 mb-1"
                htmlFor="currentPassword"
              >
                Phone :
              </label>

              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                type="tel"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder=" "
              />
            </div>

            {formik.errors.phone && formik.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            ) : null}

            <div className="relative z-0 w-full mb-5 group">
              <label
                className="block text-medium font-medium text-gray-900 mb-1"
                htmlFor="currentPassword"
              >
                Password :
              </label>

              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder=" "
              />
            </div>

            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}

            <div className="relative z-0 w-full mb-5 group">
              <label
                className="block text-medium font-medium text-gray-900 mb-1"
                htmlFor="currentPassword"
              >
                rePassword :
              </label>

              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                type="password"
                name="rePassword"
                id="rePassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder=" "
              />
            </div>

            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            ) : null}

            <div className="flex  items-center">
              <button
                type="submit"
                className="text-white   bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {isLoding ? (
                  <i className="fas fa-spinner fa-spin ms-2"></i>
                ) : (
                  "Submit"
                )}
              </button>

              <p className="pl-4 ">
                {" "}
                <span className="font-bold me-6 lg:me-0">
                  {" "}
                  <Link to="/login">Login Now ?</Link>{" "}
                </span>{" "}
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
