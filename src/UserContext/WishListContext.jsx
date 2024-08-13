import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let WishListContext = createContext()



export default function WishListContextProvider(props) {

    const [favouriteProduct, setFavouriteProduct] = useState([])
    
    let header = {
        token:localStorage.getItem('userToken')
    }

    const [wishCounter, setWishCounter] = useState(null)


    function addWishList(productId) {
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId:productId
        },{
            headers:header
        })
        .then((response)=>response)
        .catch((error)=>error)
        
    }

    function getWishList() {
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:header
        })
        .then((response)=>response)
        .catch((error)=>error)
        
    }

    function removeItem(id) {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers:header
       })
        .then((res)=> res)
        .catch((error)=>error)
        
    }

    async function Wishlistcounter() {
        let response = await getWishList()
        setWishCounter(response?.data)
          
      }
  
      
      useEffect(() => {
        Wishlistcounter()
      }, [ ])

  return  <WishListContext.Provider value={{setWishCounter,wishCounter,addWishList,getWishList,removeItem,favouriteProduct,setFavouriteProduct}}>

        {props.children}
    </WishListContext.Provider>
    
}



