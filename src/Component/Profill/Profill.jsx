import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

export default function Profile() {
  const { role } = jwtDecode(localStorage.getItem("userToken"));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className=" w-full"
      >
        <div className="row  mt-5 ">
          <div className="shadow bg-slate-50 w-full p-5">
            <div className="flex items-center ">
              <i className="fa-solid fa-circle-user mt-2 text-3xl me-3 mb-3"></i>
              <h2 className="text-4xl text-green-500 mb-3">Your Info</h2>
            </div>
            <ul className="list-unstyled px-8">
              <li className="mb-2 font-medium text-lg">
                Name:{" "}
                <span className="text-gray-800">
                  {localStorage.getItem("name")}
                </span>
              </li>
              <li className=" mb-2 font-medium text-lg">
                Email:{" "}
                <span className="text-gray-800">
                  {localStorage.getItem("email")}
                </span>
              </li>
              <li className="mb-2 font-medium text-lg">
                Role: <span className="text-gray-800">{role}</span>
              </li>
            </ul>

            <div className="mb-8 mt-8">
              <NavLink to="/updateData" className="linkItem flex items-center">
                <i className="fa-solid fa-pen-to-square text-2xl mt-2  me-3"></i>
                <h4 className="m-0 text-2xl">Update Your Data</h4>
              </NavLink>
            </div>
            <div className="mb-5">
              <NavLink
                to="/changePassword"
                className="linkItem flex items-center"
              >
                <i className="fa-solid text-2xl fa-wrench mt-2 fs-3 me-3"></i>
                <h4 className="m-0 text-2xl">Update Your PassWord</h4>
              </NavLink>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
