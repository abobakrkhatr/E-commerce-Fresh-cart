import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext/UserContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Login() {
  let { setUserLogin } = useContext(UserContext);

  let Navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must be valid Upercase")
      .required("password is required"),
  });

  function handleLogin(formValue) {
    setIsLoding(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValue)
      .then((apiRespones) => {
        localStorage.setItem("userToken", apiRespones.data.token);
        localStorage.setItem("name", apiRespones?.data?.user?.name);
        localStorage.setItem("email", apiRespones?.data?.user?.email);
        localStorage.setItem("role", apiRespones?.data?.user?.role);
        setUserLogin(apiRespones?.data?.token);
        toast.success("Welcome" + " " + apiRespones?.data?.user?.name, {
          position: "top-center",
          icon: (
            <i className="fa-regular fa-face-laugh-beam fa-lg text-[#FFD43B]"></i>
          ),
        });
        // setUserLogin(apiRespones?.data?.user);

        Navigate("/");
        setIsLoding(false);
        // console.log(apiRespones);
      })
      .catch((apiRespones) => {
        setIsLoding(false);

        setApiError(apiRespones?.response?.data?.message);
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

    onSubmit: handleLogin,
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

          <h2 className="text-3xl text-center lg:text-start font-bold text-green-600 mb-6">
            Login Now
          </h2>
          <form onSubmit={formik.handleSubmit} className=" ">
            <div className="relative z-0 w-full mb-5 group">
              <label
                className="block text-medium font-medium text-gray-900 mb-1"
                htmlFor="currentPassword"
              >
                Email :
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

            <div className="flex  justify-between items-center">
              <div>
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  {isLoding ? (
                    <i className="fas fa-spinner fa-spin ms-2"></i>
                  ) : (
                    "Login"
                  )}
                </button>
                <span className="font-bold text-green-500">
                  {" "}
                  <Link to="/registertion">Register Now ?</Link>{" "}
                </span>
              </div>

              <div className=" ">
                <span className="font-bold flex items-center  ms-4 lg:me-0 text-blue-600 hover:text-black">
                  {" "}
                  <Link to="/forgetPassword">
                    <i className="fa-solid fa-unlock-keyhole pe-1"></i>
                    Forget Password
                  </Link>{" "}
                </span>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
