import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../UserContext/CartContext';
import { toast } from 'react-toastify'





export default function ProductDetails() {
  let {addToCart} = useContext(CartContext)
  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
  var sliderProduct = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay:true
  };
  let {id,category} = useParams()
  
    const [productDetails, setProductDetails] = useState(null)
    const [relatedProduct, setRelatedProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isloding2, setIsloding2] = useState(false)



    async function getCart(productId) {
    
      setIsloding2(true)
        let response =await addToCart(productId)
        
        if (response?.data?.status==="success") {
          toast.success(response?.data?.message)
          setIsloding2(false)
        }else{
          toast.error("Make sure there is internet")
          setIsloding2(false)
        }
      }



   function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
      setProductDetails(data?.data)
      // console.log(data.data.id);
    })
    
   } 

   function getRelaredProduct(category) {
    setIsLoading(false)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
      setIsLoading(true)
      let allProduct = data.data
     let related = allProduct.filter((item)=>item.category.name==category)
     setRelatedProduct(related)
      
      
      // console.log(related);
      
    })

    .catch((error)=>{error})
    
  }

   useEffect(()=>{
    getProductDetails(id)
    getRelaredProduct(category)
   },[id , category])
  return (
    <>
    {isLoading? <div className=''>
      <div className='mx-auto bg-main-light p-4 mt-6 mb-10  rounded shadow m-5'>

     
      <div className="row mx-8 ">
    <div className='w-full lg:w-1/4'>
    <Slider {...settings}>
    {productDetails?.images.map((src)=>   <div className='w-full md:w-1/2'><img className='w-full' src={src} alt={src?.title} /></div>  


    )}
    </Slider>
    </div>
    <div className='w-full lg:w-3/4 p-8  '>
      <h1 className='text-gray-600 font-bold '>{productDetails?.title}</h1>
      <p className='text-gray-950 font-normal mt-2'>{productDetails?.description.split(' ').slice(0,2).join(" ")}</p>

      <div className='flex justify-between items-center mt-2'>
        <span>{productDetails?.price}</span>
        <span>{productDetails?.ratingsAverage}
        <i className='fa fa-star text-yellow-300'></i>
        </span>
      </div>
      <button onClick={()=>getCart(productDetails.id)} className='btn'>
        {isloding2 ?<>
          Loding..... 
          <i className='fas fa-spinner fa-spin'></i>
          
        </>:"add to Cart"}
        </button>
    </div>
    </div>
    </div>

<div className="container mx-auto mb-10">
  
<Slider {...sliderProduct}>
     
     {relatedProduct.map((category)=><Link to={`/productDetails/${category.id}/${category.category.name}`}><div>
      
       <img className='category-img w-full' src={category?.imageCover} alt={category?.title} />
       <h3 className='text-center '>{category?.title.split(' ').slice(0,1).join(" ")}</h3>
     </div> </Link>)}
   </Slider>

</div>

    </div> :<Loading/> }
 


    
    </>
    )
}
