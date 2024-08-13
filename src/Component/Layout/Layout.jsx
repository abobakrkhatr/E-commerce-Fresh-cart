import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    const [Counter, setCounter] = useState()
  return (
    <>
    <Navbar/>
    <div className='container mx-auto p-10 mt-10'>
    <Outlet></Outlet>

    </div>
    <Footer/>
    </>
    )
}
