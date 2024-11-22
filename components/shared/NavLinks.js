'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ user }) => {
  const pathname = usePathname();

  return (
    <div className="max-md:hidden flex gap-3 text-white">
      <Link
        href={user ? "/learn" : "/login"}
        className={`py-2 px-6 font-medium rounded-full text-white hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
      >
        Explore
      </Link>
      <Link
        href={user ? "/problems" : "/login"}
        className={`py-2 px-6 font-medium rounded-full text-white hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
          pathname === "/problems" ? "active" : ""
        }`}
      >
        Problems
      </Link>
      <Link
        href={user ? "/contests" : "/login"}
        className={`py-2 px-6 font-medium rounded-full text-white hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
          pathname === "/contests" ? "active" : ""
        }`}
      >
        Challenges
      </Link>
      <Link
        href={user ? "/interview" : "/login"}
        className={`py-2 px-6 font-medium rounded-full text-white hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
          pathname === "/interview" ? "active" : ""
        }`}
      >
        Interview Prep
      </Link>
    </div>
  );
};

export default NavLinks;
