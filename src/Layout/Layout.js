import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-primary overflow-hidden">
      <Navbar />
      <div className="w-2/3 lg:w-full mx-auto border-l border-r border-gray-600 min-h-screen h-full px-5 pb-10 pt-14 lg:border-none lg:pt-20">
        {children}
      </div>
    </div>
  );
};

export default Layout;
