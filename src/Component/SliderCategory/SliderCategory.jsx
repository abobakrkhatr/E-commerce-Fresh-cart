import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function SliderCategory() {
  var settings = {
    dots: false,
    autoplaySpeed : 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay:true
  };
    const [sliderCategory, setSliderCategory] = useState([])

    function getSliderCategory() {
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
        
        setSliderCategory(data.data)
      //  console.log(data.data);
      })

      
    }
    useEffect(()=>{
      getSliderCategory()
    },[])
  return (
    <>
    <div className='py-3 container mx-auto'>
      <h2 className='py-4 text-gray-800 font-medium  text-xl'>Shop Popular Categories</h2>
    <Slider {...settings}>
      {sliderCategory.map((category,index)=><div className='w-full md:w-1/2' key={index}> 
        
        <img className='category-img w-full' src={category?.image} alt={category?.name} />
        <h3 className='text-center'>{category?.name}</h3>
      </div>)}
    </Slider>
    </div>
   
    </>
    )
}
