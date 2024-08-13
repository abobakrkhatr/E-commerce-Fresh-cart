import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from '../Loading/Loading';




export default function SubCategory() {
  const [SubCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  async function subCategory(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );

    setSubCategories(data.data);
    setLoading(false);
  }
  useEffect(() => {
    subCategory(id);
    getSpecificCategory(id);
  });

  let [specificCategory, setSpecificCategory] = useState([]);

  async function getSpecificCategory(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
    setSpecificCategory(data.data);
  }

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <div className="mx-auto bg-main-light p-4  mt-16 mb-16 rounded shadow m-5 ">
          <div className="row items-center ">
            <div className="w-full md:w-1/4 ">
              <div>
                <img
                  src={specificCategory?.image}
                  alt={specificCategory.title}
                  className="w-100 rounded"
                />
              </div>
            </div>
            <div className="w-full md:w-3/4 p-5">
              <div className="w-full">
                <h2 className="text-main text-4xl text-green-400 font-semibold ">
                  {specificCategory?.name}
                </h2>
                <h2 className="pt-7 text-3xl font-medium pb-7">Sub Categories :</h2>
                
                {SubCategories.map((category, index) => (
                  
                  <span className=" tit text-white font-medium rounded px-1  ms-1 " key={index}>
                 {category.name} 
               </span>
                
             ))}
               
              
              </div> 
            </div>
          </div>
        </div>
      )}
    </>
  );
}
