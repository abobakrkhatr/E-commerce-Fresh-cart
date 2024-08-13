import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';



export default function OrderDetails() {
  const [isLoading, setIsLoading] = useState(true)
  
  let {id} = jwtDecode(localStorage.getItem("userToken"))

  let {index} = useParams()

  const [order, setOrder] = useState(null)
  

   function getUserOrderDetails(id) {
    setIsLoading(false)
     axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((res)=>{
       
          setOrder(res?.data[index])
         
          setIsLoading(true)
          

      })
      
      .catch((err)=>{
         
          setIsLoading(true)
      })}

   

  useEffect(() => {
    getUserOrderDetails(id)
  }, [])
  
  return (
    <>
    {isLoading? <div>
      <div className='container p-8 '>
    <h2 className='text-4xl font-normal '>Order Details:</h2>
            <h2 className='text-4xl mt-3'>
              Total Price :{" "}
              <span className="tex text-3xl ">{order?.totalOrderPrice}EGP</span>
            </h2>

            


            <div className="row gap-y-10 mt-5 mb-5 border-b-4 ">
              <div className="order-des flex flex-col items-center w-full lg:w-1/3 text-2xl">
                <p className='mb-3'>Order Number: # <span className='tex'>{order?.id}</span></p>
                <p>
                  Payment Method:{" "}
                  <span className="bg-main text-white  btn">
                    {order?.paymentMethodType}
                  </span>
                  <div className="flex mt-4">
                    <p>
                      Is Paid:{" "}
                      {order?.isPaid ? (
                        <span className="tex">True</span>
                      ) : (
                        <span className="text-red-600">False</span>
                      )}
                    </p>
                    <p className="ms-4">
                      Is Delivered:{" "}
                      {order?.isDelivered ? (
                        <span className="tex">True</span>
                      ) : (
                        <span className="text-red-600">False</span>
                      )}
                    </p>
                  </div>
                </p>
              </div>

              <div className="customer-info w-full lg:w-1/3 flex flex-col items-center text-2xl">
                <h3>
                  <i className="fa-solid fa-user "></i> Customer Info
                </h3>
                <p className="mb-1">Name: <span className='tex'>{order?.user?.name}</span> </p>
                <p className="mb-1">Email: <span className='tex'>{order?.user?.email}</span> </p>
                <p className="mb-1">Phone: <span className='tex'>{order?.user?.phone}</span></p>
              </div>

              <div className="order-info text-start w-full lg:w-1/3 text-2xl  flex flex-col items-center ">
                <h3>
                  <i className="fa-solid fa-cart-shopping  "></i> Order Info
                </h3>
                <p className="mb-1">Name: <span className='tex'>{order?.shippingAddress?.details}</span> </p>
                <p className="mb-1">Phone: <span className='tex'>{order?.shippingAddress?.phone}</span> </p>
                <p className="mb-1">City: <span className='tex'>{order?.shippingAddress?.city}</span> </p>
              </div>
            </div>
    </div>
  

    <div className='p-10'>
    {order?.cartItems?.map((orderProduct, index) => (
              <div
                key={index}
                className="row   mb-16 justify-around cart-item items-center bg-main-light   rounded-xl  shadow-xl"
              >
                <div className="w-1/2 font-semibold  flex items-center ">
                  <img
                    src={orderProduct?.product.imageCover}
                    alt={orderProduct?.product.title}
                    className="w-1/6 "
                  />
                  <div className="mx-4">
                    <h3>
                      {orderProduct?.product.title
                        .split(" ")
                        .slice(0, 2)
                        .join(" ")}
                    </h3>
                    <p className="tex">
                      {orderProduct?.product?.category?.name}
                    </p>
                    <h6 className="mt-2">
                      Price:{" "}
                      <span className="tex">{orderProduct?.price}EGP</span>
                    </h6>
                  </div>
                </div>
                <div className="w-1/6 ">
                  <h6 className="font-bold">
                    Count :{" "}
                    <span className="text-main">{orderProduct?.count}</span>
                  </h6>
                </div>
              </div>
            ))} 
    </div>
    </div>:<Loading/>}
   

            
    </>
    )
}
