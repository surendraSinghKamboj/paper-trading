import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 py-2 text-white flex justify-around">
      <h1 className="cursor-pointer">Paper Trading</h1>
      <ul className="flex gap-2">
        <li className="hover:scale-105 transition-all duration-300 hover:text-gray-300"><Link href={"/dashboard"}>Orders</Link></li>
        <li className="hover:scale-105 transition-all duration-300 hover:text-gray-300"><Link href={"/dashboard"}>Portfolio</Link></li>
        <li className="hover:scale-105 transition-all duration-300 hover:text-gray-300"><Link href={"/dashboard"}>Funds</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
