import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let UserContext = createContext(0)

export function UserContextProvider(props) {
let headers = {
  token: localStorage.getItem('userToken')
}
   async function UpdatePassword(values) {
      return axios
        .put(
          `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword `,
           values ,
          {
            headers:headers
          }
        )
        .then((response) => response)
        .catch((err) => err);
    }

    useEffect(()=>{

 if (localStorage.getItem('userToken')!==null) {
    setUserLogin(localStorage.getItem('userToken'))
    
 }

    },[])

    const [userLogin, setUserLogin] = useState(null)
    const [userData, setUserData] = useState(null)

    return <UserContext.Provider value={{userLogin,setUserLogin,userData,setUserData,UpdatePassword}}>
      {props.children}
    </UserContext.Provider>
    
}