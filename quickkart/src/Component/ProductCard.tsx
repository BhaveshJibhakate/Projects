import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartActions";
import { ToastContainer, toast } from "react-toastify";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  rating: number;
  images: string;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  price,
  rating,
  images,
}) => {
  const { Allproducts } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const notify = () =>
    toast.success("Added Successfully", {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
    });
  const handleclick = (id: number) => {
    const AddableProduct = Allproducts.find((items: any) => items.id === id);
    dispatch(addToCart(AddableProduct));
    notify();
  };

  return (
    <div className="bg-[#f3b7b7] shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
      <img className="w-full h-48  object-contain rounded-md mb-4" 
       src={images} alt={title} loading="lazy"  />
      <p className="font-bold text-black text-lg truncate mb-2">{title}</p>
      <p className="text-black font-semibold mb-2">Price: Rs.{price}</p>
      <p className="text-yellow-900 font-medium mb-4">⭐ {rating}</p>
      <button 
      className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
      onClick={() => handleclick(id)}>Add to Cart</button>
      <ToastContainer />
    </div>
  );
};

export default ProductCard;
