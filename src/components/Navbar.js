import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import Link from "next/link";
const Navbar = ({ btnBack }) => {
  return (
    <div className="w-full flex   px-10 text-white bg-gradient-to-b from-slate-700/80 h-20 items-center justify-between fixed z-20">
      <Link href="/">
        <div>Logo</div>
      </Link>
      {!btnBack && (
        <div className="">
          <button className="block lg:hidden">Hamburg</button>
          <ul className="hidden lg:flex gap-2  ">
            <li>
              <Link href="#drama"> Drama</Link>
            </li>

            <li>
              <Link href="#accion">About</Link>
            </li>
            <li>
              <a href="#personajes">Personajes</a>
            </li>
            <li>
              <a href="#footer">Contact</a>
            </li>
          </ul>
        </div>
      )}
      {btnBack && (
        <Link href="/">
          <button>Back</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;