import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

import { BsBoxFill } from "react-icons/bs";
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import fiendCart from "../../assets/Shopping_cart_icon.svg.f8fe30e7c8486fa64804.png"





export default function AllOrders() {
    const [isLoading, setIsLoading] = useState(true)
  
    let {id} = jwtDecode(localStorage.getItem("userToken"))
   
    const [order, setOrder] = useState(null)
    

     function getUserOrders(id) {
      setIsLoading(false)
       axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        .then((res)=>{
          
            setOrder(res?.data)
            setIsLoading(true)
        })
        
        .catch((err)=>{
            
            setIsLoading(true)
        })}

    useEffect(() => {
      getUserOrders(id)
    }, [])
    
  return (
    <>
    {order?.length==0?<div>
      <div className="row">
          <div className="flex flex-col justify-center items-center mt-10 mb-5">
          
          <img src={fiendCart} alt="empty cart"  className="w-1/4 "/>
          
          <h4 className="text-main text-3xl font-bold pb-2">Your cart is empty</h4>
          <p className="text-secondary text-center mt-3 pb-2">
            Looks like you haven't added anything to your cart. <br />
            Go ahead & explore top products
          </p>
          <Link to="/proudct" className="btn-out3 mt-3 bg-main text-white font-bold ">
            Explore Our Products
          </Link>
        </div>
        </div>
    </div>:<div>
    <h2 className='text-center mx-auto py-8  text-4xl font-semibold '>All <span className='tex'>Order</span></h2>

{isLoading? <div className="row py-20  mx-auto mb-12 ">

{order?.map((item ,index)=><div key={index} className='w-1/2 md:w-1/3 lg:w-1/4 px-12 mt-3 mx-auto'>

<Link to={`/orderdetails/${index}`}>
<div className='orderIcone p-6 flex justify-center items-center'>
  <div className='flex flex-col '>
  <span className='flex justify-center items-center text-lg font-semibold mt-1'>{index + 1}</span>
  <BsBoxFill  className='text-8xl   cursor-pointer   '/>
  <h2 className='flex justify-center items-center text-lg font-semibold mt-3'>Order</h2>
  </div>
  
</div>
</Link>


</div>)}

</div>:<Loading/>}
      </div>}
   

  
   
    </>
    )
}
