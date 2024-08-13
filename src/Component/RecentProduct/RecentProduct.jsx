import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../UserContext/CartContext";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { WishListContext } from "../../UserContext/WishListContext";
import { Offline, Online } from "react-detect-offline";
import { motion } from "framer-motion";

export default function RecentProduct() {
  const [isloding, setIsloding] = useState(false);
  const [isloding2, setIsloding2] = useState(false);
  const [serch, setSerch] = useState("");


  let {
    addWishList,
    favouriteProduct,
    setFavouriteProduct,
    removeItem,
    setWishCounter,
  } = useContext(WishListContext);

  let { addToCart, setCounter } = useContext(CartContext);
  const [recentProduct, setRecentProduct] = useState(null);

  async function getCart(productId) {
    setIsloding(true);
    let response = await addToCart(productId);
    
    if (response?.data?.status === "success") {
      toast.success(response?.data?.message, {
        autoClose: 5000,
        pauseOnFocusLoss: false,
      });
      setIsloding(false);
      setCounter(response?.data);
    } else {
      toast.error("Make sure there is internet", { autoClose: 5000 });
      setIsloding(false);
    }
  }

  function getRecentProduct() {
    setIsloding2(false);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setIsloding2(true);
        setRecentProduct(data.data);
        
      });
  }

  async function getWishList(productId) {
    let response = await addWishList(productId);

    if (response?.data?.status === "success") {
      toast.success("Product added successfully to your WishList", {
        position: "top-center",
      });
      setFavouriteProduct(response?.data?.data);
      setIsloding(false);
      
      setWishCounter(response?.data);
    } else {
      toast.error("Make sure there is internet");
      setIsloding(false);
    }
  }

  async function removeWishlist(id) {
    let { data } = await removeItem(id);
   
    if (data?.status == "success") {
      
      toast.error("Product removed successfully from WishList", {
        position: "top-center",
      });
      setFavouriteProduct(data?.data);
      setWishCounter(data?.data);
    }
  }

  useEffect(() => {
    getRecentProduct();
  }, []);

  return (
    <>
      <form className="max-w-2xl mx-auto mt-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>

        <input
          onChange={(e) => setSerch(e.target.value)}
          type="search"
          id="default-search"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by Name......."
          required
        />
      </form>

      {isloding2 ? (
        <div className="row mt-7 gap-y-10">
          {recentProduct
            ?.filter((item) => {
              return serch.toLowerCase() === ""
                ? item
                : item?.title.toLowerCase().includes(serch);
            })
            .map((item) => (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.1}}
                key={item?.id}
                className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 px-4"
              >
                <div className="product shadow-lg p-5 text-center">
                  {favouriteProduct.includes(item?.id) ? (
                    <div className="flex justify-start mb-3">
                      <i
                        onClick={() => removeWishlist(item.id)}
                        role="button"
                        className="fa-solid fa-heart fa-lg  text-red-600 "
                      ></i>
                    </div>
                  ) : (
                    <div className="flex justify-start mb-3 ">
                      <i
                        onClick={() => getWishList(item.id)}
                        role="button"
                        className="fa-regular fa-heart fa-lg  "
                      ></i>
                    </div>
                  )}

                  <Link to={`/productDetails/${item.id}/${item.category.name}`}>
                    <img src={item?.imageCover} alt={item?.title} />
                    <span className="block font-light text-green-400 mt-1">
                      {item?.category?.name}
                    </span>
                    <h2 className="text-lg font-semibold text-gray-800 mt-1">
                      {item?.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="flex justify-between items-center mt-2">
                      <span>{item.price} EGP</span>
                      <span>
                        {item.ratingsAverage}
                        <i className="fa fa-star text-yellow-300"></i>
                      </span>
                    </div>
                  </Link>

                  <button onClick={() => getCart(item.id)} className="btn">
                    {isloding ? (
                      <>
                        Loding.....
                        <i className="fas fa-spinner fa-spin"></i>
                      </>
                    ) : (
                      "add to Cart"
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
