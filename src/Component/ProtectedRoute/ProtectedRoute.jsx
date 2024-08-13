import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const [Counter, setCounter] = useState()

    if (localStorage.getItem("userToken")!==null) {
     return props.children
    }else{
     return <Navigate to={"/login"}/>
    }
  return (
    <>
    
    </>
    )
}
