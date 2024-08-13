import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

import MainSlider2 from '../../assets/slider-image-2.jpeg'
import Slider1 from '../../assets/slider-image-3.jpeg'
import Slider2 from '../../assets/slider-image-1.jpeg'
import Slider3 from '../../assets/close-up-woman-carrying-shopping-bags.9329ca18390211e62a5a.jpg'
import Slider4 from '../../assets/grocery-banner.png'

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    autoplaySpeed : 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false

  };
    const [Counter, setCounter] = useState()
  return (
    <>
    <div className="container mx-auto ">
    <div className="flex flex-wrap py-3">
      <div className=" w-full md:w-3/4 lg:w-3/4 xl:w-3/4 " >
      <Slider {...settings}>
      <img src={MainSlider2}  className='w-full h-[400px]' />
      <img src={Slider3}  className='w-full h-[400px]' />
      <img src={Slider4}  className='w-full h-[400px]' />

    </Slider>
      </div>
      <div className=" w-full md:w-1/4 lg:w-1/4 xl:w-1/4 ">
      <img src={Slider1}  className='w-full h-[200px]' />
      <img src={Slider2}  className='w-full h-[200px]' />

      </div>
    </div>

    </div>
    
    </>
    )
}
