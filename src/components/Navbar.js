import React from "react";
import { useAppContext } from "@/contexts/AppContext";

const Navbar = () => {
  return (
    <div className="w-full flex   px-10 text-white bg-gradient-to-b from-slate-700/80 h-20 items-center justify-between fixed z-20">
      <div>Logo</div>
      <div className="">
        <button className="block lg:hidden">Hamburg</button>
        <ul className="hidden lg:flex gap-2  ">
          <li>
            <a href="#hero">Home</a>{" "}
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#personajes">Personajes</a>
          </li>
          <li>
            <a href="#footer">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;