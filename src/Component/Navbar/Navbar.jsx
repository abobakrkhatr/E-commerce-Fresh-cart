import React, { useContext, useEffect, useState } from "react";

import logo from "../../assets/logo.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext/UserContext";
import { CartContext } from "../../UserContext/CartContext";
import { WishListContext } from "../../UserContext/WishListContext";

export default function Navbar() {
  let Navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  // console.log(setUserLogin);
  let { counter, displayCart, setCounter } = useContext(CartContext);
  let { wishCounter } = useContext(WishListContext);
  // console.log(wishCounter);
  const [showicon, setShowIcon] = useState(false);

  // async function CartCount() {
  //   let {data} =await displayCart()
  //   setCounter(data?.numOfCartItems)
  //   console.log(data);
  // }

  function Logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setUserLogin(null);
    Navigate("/login");
  }

  useEffect(() => {
    wishCounter
  }, [wishCounter]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex justify-between bg-gray-200 text-slate-600 w-screen z-50 duration-500">
        <div className="px-5 xl:px-12 py-4 flex w-full items-center justify-between">
          <Link to={"/header"} className="text-3xl font-bold font-heading">
            <img className="h-9" src={logo} alt="logo" />
          </Link>
          {userLogin !== null ? (
            <ul
              className={` ${
                showicon ? "" : "hidden"
              } absolute top-full left-0 w-full xl:w-auto bg-slate-100 xl:bg-transparent gap-10 xl:static xl:flex p-4 xl:p-0 px-10 mx-auto text-xl`}
            >
              <li className="hover:pl-2 xl:hover:pl-0 duration-500 py-2">
                <NavLink className="hover:text-gray-500" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="hover:pl-2 xl:hover:pl-0 duration-500 py-2">
                <NavLink className="hover:text-gray-500" to={"/proudct"}>
                  Products
                </NavLink>
              </li>

              <li className="hover:pl-2 xl:hover:pl-0 duration-500 py-2">
                <NavLink className="hover:text-gray-500" to={"/categories"}>
                  Catagories
                </NavLink>
              </li>

              <li className="hover:pl-2 xl:hover:pl-0 duration-500 py-2">
                <NavLink className="hover:text-gray-500" to={"/brands"}>
                  Brands
                </NavLink>
              </li>
              <li className="hover:pl-2 xl:hover:pl-0 duration-500 py-2">
                <NavLink className="hover:text-gray-500" to="allorders">
                  Orders
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="flex gap-5 text-lg mr-10">
              <li>
                <NavLink
                  className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
                  to={"/registertion"}
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}
          {userLogin !== null ? (
            <div
              className={` ${
                showicon ? "" : "hidden"
              } absolute bg-slate-200 xl:bg-transparent top-[320px] w-full xl:w-auto left-0 xl:static xl:flex xl:gap-5 p-10 xl:p-0 flex justify-between items-center`}
            >
              <Link to={"/wishlist"} className="hover:text-gray-500 relative">
                <i className="fa-regular fa-heart text-2xl"></i>
                <span className="absolute -top-3 flex justify-center items-center -right-2 text-xl p-3 bg-pink-500 w-5 h-5 rounded-full">
                  {wishCounter?.data?.length}
                </span>
              </Link>
              <Link
                to={"/cart"}
                className="flex items-center relative hover:text-gray-500"
              >
                <i className="fa-brands fa-opencart text-2xl"></i>
                <span className="absolute -top-3 flex justify-center items-center -right-2 text-xl p-3 bg-pink-500 w-5 h-5 rounded-full">
                  {counter?.numOfCartItems}
                </span>
              </Link>
              <Link
                to={"/profile"}
                className="flex items-center hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 hover:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
              <ul>
                <li onClick={() => Logout()}>
                  <Link className="hover:text-gray-500 btn-out text-lg font-semibold ">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        {userLogin !== null ? (
          <Link to={"/cart"} className="xl:hidden flex mr-6 items-center">
            <i className="fa-brands fa-opencart text-2xl"></i>
            <span className="flex absolute -mt-5 ml-4">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-100 text-yellow-400">
                {counter?.numOfCartItems}
              </span>
              <span className="relative inline-flex rounded-full h-3 w-3"></span>
            </span>
          </Link>
        ) : null}
        {userLogin !== null ? (
          <span
            onClick={() => setShowIcon(!showicon)}
            className="navbar-burger cursor-pointer self-center mr-12 xl:hidden"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:rotate-180 duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </span>
        ) : null}
      </nav>
    </>
  );
}