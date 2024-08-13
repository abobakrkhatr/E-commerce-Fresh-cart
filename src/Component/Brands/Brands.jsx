import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'



export default function Brands() {
    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [brandsDetails, setBrandsDetails] = useState([])

    function getBrands() {
      setIsLoading(false)
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({data})=>{
        setIsLoading(true)
      
       setBrands(data.data)
      })
      .catch((error)=>{
        setIsLoading(true)
       
      })
      
    }

    function getBrandsDetails(id) {
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then(({data})=>{

        setBrandsDetails(data.data)
      })
      
    }

   
    useEffect(() => {
      getBrands()
      
    }, [])
    
  return (
    <>
    {isLoading?<div role='button' data-modal-target="static-modal" data-modal-toggle="static-modal"  className=" row p-8 mt-5">
      
      { brands.map((item)=><div  key={item._id}  onClick={() => getBrandsDetails(item._id)} className='w-full md:w-1/3 lg:w-1/4 p-5 '>
     
      <div  className="product2 rounded-lg ">
       <img className='w-full rounded-lg ' src={item?.image} alt={item?.name} />
       <h2 className='text-center'>{item?.name}</h2>
       </div>
      
      </div>)}
     

      


<div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {brandsDetails?.name}
                </h3>
                <button type="button" data-modal-hide="static-modal"  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 flex justify-center items-center space-y-4">
                <img src={brandsDetails?.image} alt={brandsDetails?.name} />
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex justify-end items-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button type='button' data-modal-hide="static-modal"  className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-green-600 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
            </div>
        </div>
    </div>
</div>



      
    </div>: <Loading/>}
    
    </>
    )
}






