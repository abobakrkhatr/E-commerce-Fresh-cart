import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SliderCategory from '../SliderCategory/SliderCategory'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'



export default function Categories() {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    function getCategory() {
      setLoading(false)
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
        setLoading(true)
      
      setCategoryProduct(data?.data)
      })

      .catch((error)=>{
      
      })
      
    }

    useEffect(() => {
      getCategory()
    
      
    }, [])
    
  return (
    <>
    {loading? <div>
      <SliderCategory/>
    <div className='category container  mt-5'>
   <div className="row mt-5 gap-y-5">
    
    
    {categoryProduct.map((item)=><div key={item?._id} className='w-full md:w-1/2 lg:w-1/4 p-5 hover:scale-105 duration-500'>
      
    <Link to={`/categoryDetails/${item._id}`}>
      <div className='product category-son text-center relative overflow-hidden shadow-md rounded-lg'>
       
        
      <img src={item?.image} className='w-full h-[300px] object-fill rounded-lg' alt={item?.slug} />
      <div className='category-son-style rounded-lg absolute top-0 left-0 right-0 bottom-0 bg-opacity-25 bg-[#0009] translate-y-full duration-500 z-10 flex items-center justify-center text-2xl font-semibold text-gray-100'>{item?.name}</div>
      
    </div>
    
      
    </Link>
   </div>)}
   
   
   </div>
   </div>
    </div>:<Loading/>}
    
    </>
 
    )
}
