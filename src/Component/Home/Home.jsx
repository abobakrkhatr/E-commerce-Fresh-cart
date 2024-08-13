import React, { useEffect, useState } from 'react'
import RecentProduct from '../RecentProduct/RecentProduct'
import SliderCategory from '../SliderCategory/SliderCategory'
import MainSlider from '../MainSlider/MainSlider'



export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
  return (
   
    <>
    
    <MainSlider/>
    <SliderCategory/>
   <RecentProduct/>
   
  
    </>
    )
}
