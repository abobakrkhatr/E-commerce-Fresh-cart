import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../UserContext/WishListContext";
import { toast } from "react-toastify";
import { CartContext } from "../../UserContext/CartContext";
import Loading from "../Loading/Loading";
import NotFoundWishList from "../../assets/NotWishList.png";
import { Link } from "react-router-dom";

export default function WishList() {
  const [displayWish, setDisplayWish] = useState(null);
  const [displayWish2, setDisplayWish2] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [isloding2, setIsloding2] = useState(false);
  const [isloding3, setIsloding3] = useState(false);
  const [isloding4, setIsloding4] = useState(false);

  // const [wishList, setWishList] = useState(null);

  let { addToCart } = useContext(CartContext);

  let { getWishList, removeItem, setWishCounter } = useContext(WishListContext);

  async function getCart(productId) {
    setIsloding2(true);

    let response = await addToCart(productId);
    // console.log(response);
    if (response?.data?.status === "success") {
      toast.success(response?.data?.message);
      setIsloding2(false);
    } else {
      toast.error("Make sure there is internet");
      setIsloding2(false);
    }
  }

  async function DisplayWishList() {
    setIsloding3(true);
    let { data } = await getWishList();
    // console.log(data);
    setDisplayWish(data?.data);
    if (data?.status == "success") {
      setIsloding3(false);
      setWishCounter(data);
    }
  }

  async function removeWishlist(id) {
    setIsloding4(false);
    let { data } = await removeItem(id);
    // console.log(data);
    setDisplayWish2(data?.data);
    if (data?.status == "success") {
      setIsloding4(true);
      toast.error("Product removed successfully from cart");
      setWishCounter(data);
    }
  }

  useEffect(() => {
    DisplayWishList();
  }, [displayWish2]);
  // console.log(displayWish);

  return (
    <>
      {isloding3 ? (
        <Loading />
      ) : (
        <div>
          {displayWish?.length == 0 ? (
            <div>
              <div className="row">
                <div className="flex flex-col mx-auto justify-center items-center mt-20 mb-10">
                  <img
                    src={NotFoundWishList}
                    alt="empty cart"
                    className="w-3/4 "
                  />

                  <h4 className="text-main text-3xl font-bold pb-2">
                    Your Wishlist Await
                  </h4>
                  <p className="text-secondary text-center mt-3 pb-2">
                    Explore more and shortlist some items
                  </p>
                  <Link
                    to="/proudct"
                    className="btn-out3 mt-3 bg-main text-white font-bold "
                  >
                    Explore Our Products
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // <div>
            //   <div className="relative my-6 shadow-md sm:rounded-lg lg:w-3/4 mx-auto">
            //     <table className="w-full mx-auto text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
            //       <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            //         <tr>
            //           <th scope="col" className="px-0 py-3">
            //             <span className="sr-only">Image</span>
            //           </th>
            //           <th scope="col" className="px-0 py-3">
            //             Product
            //           </th>
            //           <th scope="col" className="px-0 py-3"></th>
            //           <th scope="col" className="px-0 py-3">
            //             Price
            //           </th>
            //           <th scope="col" className="px-0 py-3">
            //             Action
            //           </th>
            //         </tr>
            //       </thead>
            //       <tbody>
            //         {displayWish?.map((item, index) => (
            //           <tr
            //             key={index}
            //             className=" w-full md:3/4 bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            //           >
            //             <td className="py-4">
            //               <img
            //                 src={item?.imageCover}
            //                 className="w-16 md:w-32 max-w-full max-h-full"
            //                 alt={item?.title}
            //               />
            //               <button
            //                 onClick={() => removeWishlist(item?.id)}
            //                 className=" btn-out2 flex mt-5"
            //               >
            //                 Remove
            //               </button>
            //             </td>
            //             <td className="px-0 py-4 font-semibold text-gray-900 dark:text-white">
            //               {item?.title.split(' ').splice(0,2).join(' ')}
            //             </td>
            //             <td className="px-0 py-4">
            //               <div className="flex items-center"></div>
            //             </td>
            //             <td className="px-2 py-4 font-semibold text-p dark:text-white">
            //               {item?.price}EGP
            //             </td>
            //             <td className="px-0  py-4">
            //               <button
            //                 onClick={() => getCart(item?.id)}
            //                 className="btn-out3 w-24 lg:w-auto"
            //               >
            //                 {isloding2 ? (
            //                   <>
            //                     Loding.....
            //                     <i className="fas fa-spinner fa-spin"></i>
            //                   </>
            //                 ) : (
            //                   "add to Cart"
            //                 )}
            //               </button>
            //             </td>
            //           </tr>
            //         ))}
            //       </tbody>
            //     </table>
            //   </div>
            // </div>
            <div className="flex flex-wrap items-center justify-center p-5">
              {displayWish?.map((product) => {
                return (
                  <div
                    key={product?.product?.id}
                    className="p-3 w-full md:w-1/3 lg:w-1/5"
                  >
                    <div className="bg-white shadow-md rounded-lg p-4 transform transition duration-500 ease-in-out hover:scale-105">
                      <img
                        src={product.imageCover}
                        alt="Product Image"
                        className="object-cover w-full rounded-lg overflow-hidden"
                      />
                      <h2 className="text-lg font-bold mt-2">
                        {product?.title.split(" ").splice(0, 2).join(" ")}
                      </h2>
                      <p className="text-gray-500">{product?.price} EGP</p>
                      <div className="flex flex-col justify-between items-center mt-4">
                        <button
                          onClick={() => getCart(product?.id)}
                          className="w-full text-center bg-indigo-600 rounded-xl p-2 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                        >
                      
                              add to Cart
                         
                        </button>
                        <button
                          onClick={() => removeWishlist(product?.id)}
                          className="w-full text-center mt-5 bg-red-600 rounded-xl p-2 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-700"
                        >
                          
                              Remove from Cart
                         
                          
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* {isloading? 
  :
} */}
    </>
  );
}
