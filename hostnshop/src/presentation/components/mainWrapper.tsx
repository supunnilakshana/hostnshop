"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";


const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    
    <div className="flex justify-beteen items-start">
      <div className="hidden md:block">
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      {isSidebarOpen && (
        <div className="md:hidden">
          <Sidebar isOpen={isSidebarOpen} />
        </div>
      )}
      <div className="w-full h-screen overflow-y-auto no-scrollbar overflow-hidden">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        {children}
      </div>
    </div>
    
  );
};

export default MainWrapper;
