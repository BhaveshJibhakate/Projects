import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../Redux/cartActions";

// Styled button


interface CartCardProps {
  id: number;
  title: string;
  price: number;
  images: string;
  quantity: number;
}

const CartCard: React.FC<CartCardProps> = ({
  id,
  title,
  price,
  images,
  quantity,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center border border-gray-300 rounded-lg mb-4 p-3 bg-gray-50 shadow-sm flex-col md:flex-row md:text-left text-center gap-3">
      {/* Left - Image */}
      <img
        src={images}
        alt={title}
        className="w-24 h-24 object-cover rounded-md md:w-28 md:h-28"
      />

      {/* Middle - Details */}
      <div className="flex-1 md:ml-4">
        <p className="font-semibold text-base md:text-lg mb-1">{title}</p>
        <p className="text-gray-700 mb-2">Price: Rs.{price}</p>
        <div className="flex items-center justify-center md:justify-start gap-3">
          <span className="font-medium">Qty:</span>
          <button
            onClick={() => dispatch(increaseQuantity(id))}
            className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold text-base px-2 py-1 rounded-md transition-all duration-150"
          >
            +
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            onClick={() => dispatch(decreaseQuantity(id))}
            className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold text-base px-2 py-1 rounded-md transition-all duration-150"
          >
            -
          </button>
        </div>
      </div>

      {/* Right - Subtotal & Remove */}
      <div className="text-center md:text-right">
        <p className="text-gray-800 mb-2 font-medium">
          Subtotal: Rs.{(price * quantity).toFixed(2)}
        </p>
        <button 
        className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2 rounded-md transition-all duration-150"
        onClick={() => dispatch(removeFromCart(id))}>Remove</button>
      </div>
    </div>
  );
};

export default CartCard;
