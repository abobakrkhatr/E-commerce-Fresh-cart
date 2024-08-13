import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";



 export let CartContext =  createContext()

 export default function CartContextProvider(props) {
 
    let headers= {
        token:localStorage.getItem('userToken')
    }

    const [counter, setCounter] = useState(null)


    function UpdatItem(id,count) {
       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count:count
       },{
        headers:headers
       })
        .then((res)=>res)
        .catch((err)=>err)
    }

    function deleteCartItem(itemId) {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,{
        headers:headers
       })
       .then((res)=>res)
       .catch((err)=>err)
    }
   

    function displayCart() {
       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headers
        })
        .then((res)=>res)
        .catch((err)=>err)
        
    }
 
    

    function addToCart(productId) {
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:productId
        },{
            headers:headers
        })
        .then((response)=>response)
        .catch((error)=>error)
        
    }

    async function Cartcounter() {
      let response = await displayCart()
      setCounter(response?.data)
        
    }

    
    useEffect(() => {
        Cartcounter() 
    }, [])
    



    return <CartContext.Provider value={{addToCart,displayCart ,deleteCartItem,counter,setCounter ,UpdatItem}}>
        {props.children}
    </CartContext.Provider>
    
 }      