import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdateData() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  function changeLoggedData(values) {
    setLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, values, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then(({ data }) => {
        if (data.message === "success") {
          setLoading(false);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("email", data.user.email);
          toast.success("Update Information successfully");
          navigate("/profile");
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setLoading(false);
        toast.error("email already exist");
      });
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "min length is 3")
      .max(20, "max length is 20"),
    email: Yup.string().required("Email is Required").email("Invalid email"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "We need Egyptian number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      changeLoggedData(values);
    },
  });

  return (
    <>
     

      <div className="my-5 mt-20 w-3/4 mx-auto bg-gray-50 shadow-lg rounded bg-asset p-5">

       <div className="py-6  max-w-xl mx-auto ">

   
       {errorMsg?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
   {errorMsg}
</div>:null}

       <h2 className="text-3xl text-green-600 mb-5">Update Data</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className="block text-medium font-medium text-gray-900 mb-3" htmlFor="name">Name :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            id="name"
            name="name"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 "
          />
          {formik.errors.name && formik.touched.name ? (
             <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
             {formik.errors.name}
           </div>
          ) : null}
          <label className="block text-medium font-medium text-gray-900 mb-3" htmlFor="email">Email :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          {formik.errors.email && formik.touched.email ? (
             <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
             {formik.errors.email}
           </div>
          ) : null}

          <label className="block text-medium font-medium text-gray-900 mb-3" htmlFor="phone">Phone :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            id="phone"
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone}
          </div>
          ) : null}


<div className='flex justify-center items-center mt-5'>
    <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className=" btn-d bg-main text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-medium w-full sm:w-auto px-7 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {loading?<i className='fas fa-spinner fa-spin'></i>:"Update Data"}
       </button>
 
      </div>

          
        </form>
 
       </div>

             </div>
    </>
  );
}