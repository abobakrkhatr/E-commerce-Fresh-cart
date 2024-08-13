import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../UserContext/CartContext";
import { toast } from "react-toastify";
import Loading from "./../Loading/Loading";
import { Link } from "react-router-dom";
import fiendCart from "../../assets/Shopping_cart_icon.svg.f8fe30e7c8486fa64804.png";
import ShippingAddress from './../ShippingAddress/ShippingAddress';

``;

export default function Cart() {
  let { displayCart, deleteCartItem, UpdatItem, setCounter, counter } =
    useContext(CartContext);
  const [display, setDisplay] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [cartPrice, setCartPrice] = useState([]);
  const [cart, setCart] = useState(null);

  async function UpdatCart(id, count) {
    // setIsloading(true)

    let { data } = await UpdatItem(id, count);
    setDisplay(data?.data);
    setCart(data);

    if (data?.status == "success") {
      // setIsloading(false)
      toast.success("Product added successfully ");
    }
  }
  async function UpdatCart2(id, count) {
    // setIsloading(true)

    if (count < 1) {
      deleteItem(itemId);
    }
    let { data } = await UpdatItem(id, count);
    setDisplay(data?.data);
    setCart(data);

    if (data?.status == "success") {
      // setIsloading(false)
      toast.error("Product remove successfully ");
    }
  }

  async function getDisplayCart() {
    setIsloading(false);
    let { data } = await displayCart();

    if (data.status == "success") {
      setIsloading(true);
      setDisplay(data?.data);
      setCart(data);

      setCartPrice(data?.data?.totalCartPrice);
      setCart(data);
      setCounter(data);
    }
  }

  async function deleteItem(itemId) {
    // setIsloading(false)

    let { data } = await deleteCartItem(itemId);

    setDisplay(data?.data);
    setCart(data);
    if (data.status == "success") {
      // setIsloading(true)
      toast.error("Product removed successfully from cart");
      setCounter(data);
    }
  }

  console.log(display);
  

  useEffect(() => {
    getDisplayCart();
  }, []);

  return (
    <>
      {display?.products.length == 0 ? (
        <div>
          <div className="row">
            <div className="flex flex-col justify-center items-center mt-10 mb-5">
              <img src={fiendCart} alt="empty cart" className="w-1/4 " />

              <h4 className="text-main text-3xl font-bold pb-2">
                Your cart is empty
              </h4>
              <p className="text-secondary text-center mt-3 pb-2">
                Looks like you haven't added anything to your cart. <br />
                Go ahead & explore top products
              </p>
              <Link
                to="/proudct"
                className="btn-out3 mt-3 bg-main text-white font-bold "
              >
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {isloading ? (
            <section className=" relative   z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
            <div className="w-full  max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
              <div className="grid  grid-cols-12">
                <div className="col-span-12  xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                  <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                      Shopping Cart
                    </h2>
                    <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                    {counter?.numOfCartItems} Items
                    </h2>
                  </div>
                  <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                    <div className="col-span-12 md:col-span-7">
                      <p className="font-normal text-lg leading-8 text-gray-400">
                        Product Details
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <div className="grid grid-cols-5">
                        <div className="col-span-3">
                          <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                            Quantity
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                            Total
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {display?.products?.map((product,index) => {
                    return (
                      <div
                        key={product?.product?.id}
                        className="flex  flex-col min-[500px]:flex-row min-[500px]:items-center gap-12 border-b border-gray-200 group"
                      >
                        <div className="w-full md:max-w-[126px]">
                          <img
                            src={product?.product?.imageCover}
                            alt="perfume bottle image"
                            className="mx-auto"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                          <div className="md:col-span-2">
                            <div className="flex flex-col max-[500px]:items-center gap-3">
                              <h6 className="font-semibold text-base leading-7 text-black">
                                {product?.product?.title}
                              </h6>
                              <h6 className="font-normal text-base leading-7 text-gray-500">
                                {product?.product?.category?.name}
                              </h6>
                              <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                                {product?.price} EGP
                              </h6>
                            </div>
                            <button
                              onClick={() => deleteItem(product.product.id)}
                              className="mt-5 text-red-400 text-3xl hover:scale-105 duration-300"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                          <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                            <div className="flex items-center h-full">
                              <button
                                onClick={() =>
                                  UpdatCart2(
                                    product.product.id,
                                    product.count - 1
                                  )
                                }
                                className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                              >
                                <svg
                                  className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={22}
                                  height={22}
                                  viewBox="0 0 22 22"
                                  fill="none"
                                >
                                  <path
                                    d="M16.5 11H5.5"
                                    stroke
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M16.5 11H5.5"
                                    stroke
                                    strokeOpacity="0.2"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M16.5 11H5.5"
                                    stroke
                                    strokeOpacity="0.2"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                              <input
                                value={product?.count}
                                type="text"
                                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                                placeholder={1}
                              />
                              <button
                                onClick={() =>
                                  UpdatCart(
                                    product.product.id,
                                    product.count + 1
                                  )
                                }
                                className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                              >
                                <svg
                                  className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={22}
                                  height={22}
                                  viewBox="0 0 22 22"
                                  fill="none"
                                >
                                  <path
                                    d="M11 5.5V16.5M16.5 11H5.5"
                                    stroke
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M11 5.5V16.5M16.5 11H5.5"
                                    stroke
                                    strokeOpacity="0.2"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M11 5.5V16.5M16.5 11H5.5"
                                    stroke
                                    strokeOpacity="0.2"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                            <p className="font-bold text-lg m-6 leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                              {product?.price * product?.count} EGP
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className=" block lg:hidden mt-5 items-center justify-end">
                  <Link to= {`/ShippingAddress/${cart?.data?._id}`}>
                        <button className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">
                          Checkout
                          <i className="fa-solid text-center text-sm lg:text-medium fa-arrow-right fa-fade fa-lg text-white"></i>{" "}
                    {cartPrice }EGP
                        </button>
                      </Link>
                  </div>
                </div>
                <div className=" hidden lg:block col-span-12  xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                    Order Summary
                  </h2>
                  <div className="mt-8  p-10">
                    <div className="flex items-center justify-between pb-6">
                      <p className="font-normal text-lg leading-8 text-black">
                        {counter?.numOfCartItems} Items
                      </p>
                      <p className="font-medium text-lg leading-8 text-black">
                        {cartPrice?.totalCartPrice} EGP
                      </p>
                    </div>
                    <form>
                      <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                        Shipping
                      </label>
                      <div className="flex pb-6">
                        <div className="relative w-full">
                          <div className=" absolute left-0 top-0 py-3 px-4">
                            <span className="font-normal text-base text-gray-300">
                              Second Delivery
                            </span>
                          </div>
                          <input
                            type="text"
                            className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                            placeholder="$5.00"
                          />
                          <button
                            id="dropdown-button"
                            data-target="dropdown-delivery"
                            className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                            type="button"
                          >
                            <svg
                              className="ml-2 my-auto"
                              width={12}
                              height={7}
                              viewBox="0 0 12 7"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <div
                            id="dropdown-delivery"
                            aria-labelledby="dropdown-delivery"
                            className="z-20 hidden divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10 bg-white right-0"
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdown-button"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Shopping
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Images
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  News
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Finance
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                        Promo Code
                      </label>
                      <div className="flex pb-4 w-full">
                        <div className="relative w-full ">
                          <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                          <input
                            type="text"
                            className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                            placeholder="xxxx xxxx xxxx"
                          />
                          <button
                            id="dropdown-button"
                            data-target="dropdown"
                            className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                            type="button"
                          >
                            <svg
                              className="ml-2 my-auto"
                              width={12}
                              height={7}
                              viewBox="0 0 12 7"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <div
                            id="dropdown"
                            className="absolute top-10 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdown-button"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Shopping
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Images
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  News
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Finance
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200">
                        <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                          Apply
                        </button>
                      </div>
                   
                      <Link to= {`/ShippingAddress/${cart?.data?._id}`}>
                        <button className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">
                          Checkout
                          <i className="fa-solid text-center text-sm lg:text-medium fa-arrow-right fa-fade fa-lg text-white"></i>{" "}
                    {cartPrice}EGP
                        </button>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          ) : (
            <Loading />
          )}
        </div>
      )}

     
    </>
  );
}
