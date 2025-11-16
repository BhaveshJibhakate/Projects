import React, { useEffect, useState } from "react";
import ProductCard from "../Component/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsRequest } from "../Redux/productAction";
import { ClipLoader } from "react-spinners";
import Pagination from "../Component/Pagination";

const Products: React.FC = () => {
  const { loading, error, Allproducts } = useSelector(
    (state: any) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);
  //pagination related logic
  const itemsperPage=12;
  const [currentpage,setcurrentPage]=useState<number>(1)
  const lastindex=itemsperPage*currentpage
  const firstindex=lastindex-itemsperPage
  const totalpage=Math.ceil(Allproducts.length/itemsperPage)
  const visibleProducts=Allproducts.slice(firstindex,lastindex)
  //
  return (
    <div className="bg-[antiquewhite] min-h-screen px-6 py-10">
      <h2
       className="text-3xl font-extrabold text-center text-gray-800 mb-5"
      >
        Our Products
      </h2>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <ClipLoader color="red" size={80} />
        </div>
      )}

      {error && (
        <h2 className="text-center text-red-600 text-xl font-semibold">
          Something went wrong
        </h2>
      )}

      <div
       className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {visibleProducts.map((item: any) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            images={item.images[0]}
          />
        ))}
      </div>
          {visibleProducts.length > 0 && (
          <Pagination
          currentPage={currentpage}
          totalpage={totalpage}
          onPageChange={setcurrentPage}
        />
      )}
    </div>
  );
};

export default Products;
