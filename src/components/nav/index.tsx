import React from "react";
import { Link } from "react-router-dom";
import { BiSidebar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { togglePopup } from "@/store/cartSlice";

const Nav = () => {
  const carts = useSelector(
    (state: { cart: any; titles: string[] }) => state.cart.titles
  );
  const dispatch = useDispatch()

  const handleTogglePopup = () => {
    dispatch(togglePopup());
  };

  return (
    <div className="py-4 px-20 flex items-center justify-between border-b border-b-slate-600 w-full">
      <Link to={"/"}>Fonts</Link>
      <button className="relative" onClick={handleTogglePopup}>
        {!isEmpty(carts) && (
          <span className="absolute -top-[5px] -right-[5px] rounded-full w-2 h-2 bg-orange-500"></span>
        )}
        <BiSidebar className="text-3xl" />
      </button>
    </div>
  );
};

export default React.memo(Nav);
