import axios from 'axios'
import React, { useState } from 'react'
import  * as Yup  from 'yup';
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';





export default function ChangePassword() {
    const [isLoding, setIsLoding] = useState(false)
    const [apiError, setApiError] = useState("")
    let header ={
        token : localStorage.getItem('userToken')
    }

    let Navigate = useNavigate()

    let validationSchema = Yup.object().shape({
        currentPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,"password must be valid Upercase").required("password is required"),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,"password must be valid Upercase").required("password is required"),
        rePassword:Yup.string().oneOf([Yup.ref("password")],"repassword & password must be valid Upercase").required("rePassword is required"),
      })

    function handleChangePassword(formValue) {
        setIsLoding(true)
        axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,formValue,{
         headers:header
        })
        .then((response)=>{
            setIsLoding(false)
            Navigate("/login")
            })
        .catch((error)=>{
            setIsLoding(false)
            setApiError(error?.message)
            })
        
        
    }

    let formik = useFormik({
        initialValues:{
            currentPassword:"",
            password:"",
            rePassword:""
        },
        validationSchema,
        onSubmit:handleChangePassword
    })

    
  return (
     <>
     

     <div className="my-5 mt-20 w-3/4 mx-auto bg-gray-50 shadow-lg rounded bg-asset p-5">

     
     <div className='py-6 max-w-xl mx-auto'>

     {apiError?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
   {apiError}
</div>:null}

        <h2 className="text-3xl text-green-600 mb-5">Register Now :</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className="block text-medium font-medium text-gray-900 mb-3" htmlFor="currentPassword">currentPassword :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="currentPassword"
            name="currentPassword"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 "
          />
          {formik.errors.currentPassword && formik.touched.currentPassword ? (
             <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
             {formik.errors.currentPassword}
           </div>
          ) : null}



          <label className="block text-medium font-medium text-gray-900 mb-3" htmlFor="password">password :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="password"
            name="password"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 "
          />
          {formik.errors.password && formik.touched.password ? (
             <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
             {formik.errors.password}
           </div>
          ) : null}


          <label className="block text-medium font-medium text-gray-900 mb-3" htmlFor="rePassword">rePassword :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="rePassword"
            name="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
             <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
             {formik.errors.rePassword}
           </div>
          ) : null}

<div className='flex justify-center items-center mt-5'>
    <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className=" btn-d bg-main text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-medium w-full sm:w-auto px-7 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoding?<i className='fas fa-spinner fa-spin'></i>:"ChangePassword"}
       </button>
 
      </div> 
        </form>


     </div>

           </div>
     
     </>
  )
}
