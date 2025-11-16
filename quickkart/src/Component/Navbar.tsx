import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {

  const location=useLocation()
  console.log(location)
  const { cartItems } = useSelector((state: any) => state.cart);
  const totalItems = cartItems.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  );
  if(location.pathname!=="/form")
  return (
    <nav className="flex justify-between items-center text-white bg-[#282c35] px-6 py-3 flex-wrap md:flex-nowrap">
      <div className="text-lg md:text-xl font-bold">QuickKart</div>
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 w-full md:w-auto mt-2 md:mt-0">
        <Link to="/" className="text-white">
          Home
        </Link>
        <Link to="/products" className="text-white hover:text-[#61dafb]">
          Products
        </Link>
        <Link to="/cart" className="relative text-white hover:text-[#61dafb]">
          <div className="text-inherit">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {totalItems > 0 && 
              <span className="absolute bg-red-600 text-white text-xs font-bold rounded-full px-[6px] py-[2px]">
                {totalItems}
              </span>
            }
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
