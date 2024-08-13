import {  useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cart from './Component/Cart/Cart.jsx'
import Categories from './Component/Categories/Categories.jsx'
import Navbar from './Component/Navbar/Navbar.jsx'
import Footer from './Component/Footer/Footer.jsx'
import {RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom'
import Layout from './Component/Layout/Layout.jsx'
import Home from './Component/Home/Home.jsx'
import Proudct from './Component/Proudct/Proudct.jsx'
import Brands from './Component/Brands/Brands.jsx'
import LogIn from './Component/LogIn/LogIn.jsx'
import Registertion from './Component/Registertion/Registertion.jsx'
import Notfound from './Component/Notfound/Notfound.jsx'
import { UserContextProvider } from './UserContext/UserContext.jsx'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx'
import CategoryDetails from './Component/CategoryDetails/CategoryDetails.jsx'
import CartContextProvider from './UserContext/CartContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword.jsx'
import NewPassword from './Component/NewPassword/NewPassword.jsx'
import VerifyCode from './Component/VerifyCode/VerifyCode.jsx'
import Profile from './Component/Profill/Profill.jsx'
import UpdateData from './Component/UpdatData/UpdatData.jsx'
import WishList from './Component/WishList/WishList';
import WishListContextProvider from './UserContext/WishListContext.jsx'
import ChangePassword from './Component/ChangePassword/ChangePassword.jsx'
import { Button } from './Component/ButtonBack/Style.jsx'
import ScrollButton from './Component/ButtonBack/ButtonBack.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import ShippingAddress from './Component/ShippingAddress/ShippingAddress.jsx'
import PaymentContextProvider, { PaymentContext } from './UserContext/PaymentContext.jsx'
import AllOrders from './Component/AllOrders/AllOrders.jsx'
import OrderDetails from './Component/OrderDetails/OrderDetails.jsx'




let query = new QueryClient()




let router = createHashRouter([
  {path:"", element:<Layout/> , children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"proudct",element:<ProtectedRoute><Proudct/></ProtectedRoute>},
    {path:"profile",element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:"wishlist",element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:"UpdateData",element:<ProtectedRoute><UpdateData/></ProtectedRoute>},
    {path:"changePassword",element:<ProtectedRoute><ChangePassword/></ProtectedRoute>},
    {path:"orderdetails/:index",element:<ProtectedRoute><OrderDetails/></ProtectedRoute>},
    {path:"brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"allorders",element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"categoryDetails/:id",element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},
    {path:"ShippingAddress/:cartId",element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
    {path:"productDetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:"login",element:<LogIn/>},
    {path:"forgetPassword",element:<ForgetPassword/>},
    {path:"verifyCode",element:<VerifyCode/>},
    {path:"newPassword",element:<NewPassword/>},
    {path:"registertion",element:<Registertion/>},
    {path:"*",element:<Notfound/>},
  ]}
])








function App() {
  const [count, setCount] = useState(0)

  return <PaymentContextProvider>
  <QueryClientProvider client={query}>
   <WishListContextProvider>
<CartContextProvider>
 <UserContextProvider>
<RouterProvider router={router}></RouterProvider>
<ToastContainer/>
<ScrollButton/>
  </UserContextProvider>
  </CartContextProvider>
  

  </WishListContextProvider>

  </QueryClientProvider>
  </PaymentContextProvider>


  
    
    
  
   
}

export default App
