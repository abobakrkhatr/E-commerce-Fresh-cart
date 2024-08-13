import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import  axios  from 'axios';



export default function VerifyCode() {
  let Navigate = useNavigate()
  const [isLoding, setIsLoding] = useState(false)
  const [apiError, setApiError] = useState("")

  
    let validationSchema = Yup.object().shape({
      resetCode: Yup.string().matches(/^\d{5,6}$/ , 'Invalid Code').required("Code is Required"),

    })

    
  

   function handleVerify(formValue) {
 setIsLoding(true)
     axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,formValue)
      .then((response)=>{
        setIsLoding(false)
        Navigate("/newPassword")
        // console.log(response.response.status);
      })
      .catch((error)=>{
        setIsLoding(false)
        setApiError(error?.message)

        })

  
      
    }

    let formik = useFormik({
      initialValues:{
        resetCode:""
      },
      validationSchema,
      onSubmit:handleVerify
    })
  return (
    <>
    <div className="my-7 py-20 mb-5 mt-20  lg:w-3/4   mx-auto bg-slate-50 shadow-lg bg-asset p-5">

    {apiError?<>
      <div className="p-4  mb-5  max-w-sm  xl:max-w-4xl  mx-auto flex justify-center items-center  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
   {apiError}
</div>
    </> :null}

        <h2 className='text-center text-4xl text-green-600 mb-5 '>Write the code</h2>
        <form onSubmit={formik.handleSubmit} >
         
     <div className="mb-5 max-w-4xl mx-auto">
  <label htmlFor="resetCode" className="block mb-2 text-medium font-medium text-gray-900 ">Your Code</label>
  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" name='resetCode' id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
</div>

{formik.errors.resetCode && formik.touched.resetCode ?  <div className="p-4 mb-5 max-w-4xl mx-auto  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.resetCode}
</div>
:null}
   


    <div className='flex justify-center items-center'>
    <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className=" btn-d bg-main text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-medium w-full sm:w-auto px-7 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoding?<i className='fas fa-spinner fa-spin'></i>:"VerifyCode"}
       </button>
 
      </div>      
        

      
            
            

          
        </form>
      </div>
    </>
    )
}
