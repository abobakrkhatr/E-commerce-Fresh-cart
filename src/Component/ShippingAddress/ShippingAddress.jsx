import React, { useContext, useEffect, useState } from 'react'
import { PaymentContext } from '../../UserContext/PaymentContext';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../UserContext/CartContext';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';





export default function ShippingAddress() {
  const [loading, setLoading] = useState(false); 
  
  let {cartId}= useParams()

  let {CheckoutSession,CreateCashOrder} = useContext(PaymentContext)

  let{addToCart,deleteCartItem,setCounter,} = useContext(CartContext)

  let Navigate = useNavigate()

 async function VisaPayment(value) {
  setLoading(true);

  let {data} = await CheckoutSession(cartId , value)
  // console.log(data);
  if (data?.status === "success") {
    setLoading(false);
    window.location.href =data?.session.url;
    toast.success("Payment complete Visa successfully");
  }
    
  }

 async function CachPayment(value) {
  setLoading(true);

  let {data} = await CreateCashOrder(cartId , value)
// console.log(data);
  if (data?.status === "success") {
    toast.success("Payment complete Cach successfully!");
    setLoading(false);
    setCounter(data.numOfCartItems);
    Navigate("/allorders");
    addToCart()
  }
  
  }

  let Visa = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (value) => {
      VisaPayment(value)
    },
  });

  let Cash = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (value) => CachPayment(value)
  
   
  });
  
  return (
    <>
    <Tabs>
    <TabList className=" text-xl text-center mt-32">
          <Tab style={{ bottom: 16,top:16 }}>
            Visa <i className="fa-brands fa-cc-visa"></i>
          </Tab>
          <Tab style={{ bottom: 16,top:16 }}>
            Cash <i className="fa-solid fa-money-bill-1-wave"></i>
          </Tab>
        </TabList>

        <TabPanel>
      
    <div className='py-20 max-w-3xl mx-auto '>
     
  

      <h2 className='text-3xl font-bold text-green-600 mb-6'>Visa Payment</h2>
    <form onSubmit={Visa.handleSubmit} className=" ">
 
 
  <div className="relative z-0 w-full mb-5 group">
  <label className="block text-medium font-medium text-gray-900 mb-1" htmlFor="currentPassword">details :</label>

      <input onBlur={Visa.handleBlur} onChange={Visa.handleChange} value={Visa.values.details} type="details" name="details" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder=" "  />
  </div>

 

  

  <div className="relative z-0 w-full mb-5 group">
  <label className="block text-medium font-medium text-gray-900 mb-1" htmlFor="currentPassword">phone :</label>

      <input onBlur={Visa.handleBlur} onChange={Visa.handleChange} value={Visa.values.phone} type="phone" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder=" "  />
  </div>

  <div className="relative z-0 w-full mb-5 group">
  <label className="block text-medium font-medium text-gray-900 mb-1" htmlFor="currentPassword">city :</label>

      <input onBlur={Visa.handleBlur} onChange={Visa.handleChange} value={Visa.values.city} type="city" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder=" "  />
  </div>

 

 
<div className='flex  justify-between items-center'>
  <div>
  <button disabled={!(Visa.isValid&&Visa.dirty)} type="submit" className="text-white btn-out3 text-medium bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  {loading? <i className='fas fa-spinner fa-spin ms-2'></i>:"Visa"}

  </button>

  </div>

 

</div>
  
 
  </form>
    </div>
    
    
        </TabPanel>



        <TabPanel>
      
    <div className='py-20 max-w-3xl mx-auto '>
     
  

      <h2 className='text-3xl font-bold text-green-600 mb-6'>Cach Orders</h2>
    <form onSubmit={Cash.handleSubmit} className=" ">
 
 
  <div className="relative z-0 w-full mb-5 group">
  <label className="block text-medium font-medium text-gray-900 mb-1" htmlFor="currentPassword">details :</label>

      <input onBlur={Cash.handleBlur} onChange={Cash.handleChange} value={Cash.values.details} type="details" name="details" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder=" "  />
  </div>

 

  

  <div className="relative z-0 w-full mb-5 group">
  <label className="block text-medium font-medium text-gray-900 mb-1" htmlFor="currentPassword">phone :</label>

      <input onBlur={Cash.handleBlur} onChange={Cash.handleChange} value={Cash.values.phone} type="phone" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder=" "  />
  </div>

  <div className="relative z-0 w-full mb-5 group">
  <label className="block text-medium font-medium text-gray-900 mb-1" htmlFor="currentPassword">city :</label>

      <input onBlur={Cash.handleBlur} onChange={Cash.handleChange} value={Cash.values.city} type="city" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder=" "  />
  </div>

 

 
<div className='flex  justify-between items-center'>
  <div>
  <button disabled={!(Cash.isValid&&Cash.dirty)} type="submit" className="text-white btn-out3 text-medium  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300    w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  {loading? <i className='fas fa-spinner fa-spin ms-2'></i>:"Buy Cach"}

  </button>

  </div>

 

</div>
  
 
  </form>
    </div>
    
    
        </TabPanel>
    </Tabs>
    </>
    )
}
