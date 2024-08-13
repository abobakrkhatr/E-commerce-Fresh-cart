import axios from "axios";
import { useState } from "react";
import { createContext } from "react";


 export let PaymentContext = createContext(0)

export default function PaymentContextProvider(props) {

    let headers= {
        token:localStorage.getItem('userToken')
    }

    const [first, setfirst] = useState(0)
    // Check Out

    function CheckoutSession(CartId , shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:5173`,{
            shippingAddress  
        },{
 
             headers
        })
        .then((res)=>res)
        
        .catch((err)=>err)
        
    }

    function CreateCashOrder(CartId , shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,{
            shippingAddress
        },{
            headers
        })
        .then((res)=>res)
        
        .catch((err)=>err)
        
    }

    // get  Ordar

    function getUserOrders(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        .then((res)=>{
            // console.log(res);
        })
        
        .catch((err)=>{
            // console.log(err);
        })
        
    }



    return <PaymentContext.Provider value={{CheckoutSession,CreateCashOrder}}>
        {props.children}
    </PaymentContext.Provider>
    
}