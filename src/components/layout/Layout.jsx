import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../../pages/sidebar/Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarBg = "bg-[#030712]";
  const mainBg = "bg-[#030712]";

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const sidebarWidthClass = isSidebarOpen ? "w-[260px]" : "w-[80px]";

  const HEADER_HEIGHT_CLASS = "h-[10vh]";
  const CONTENT_HEIGHT_CLASS = "h-[90vh]";

  return (
    <div
      className={`flex flex-col h-screen ${mainBg} text-white overflow-hidden`}
    >
      <header
        className={`w-full ${sidebarBg} shadow-lg z-40 ${HEADER_HEIGHT_CLASS} border-b border-gray-700 flex-shrink-0`}
      >
        <Header toggleSidebar={toggleSidebar} />
      </header>

      <div className={`flex flex-1 ${CONTENT_HEIGHT_CLASS} relative`}>
        <div
          className={`
            ${sidebarWidthClass} 
            ${sidebarBg} 
            flex-shrink-0 
            border-r border-gray-700 
            transition-all duration-600 
            overflow-y-auto 
            
          `}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>

        <main
          className={`
            flex-1 
            p-6 
            overflow-y-auto // Main kontent o'z ichida scroll bo'ladi
            h-full // Otasi (90vh) balandligini to'liq egallaydi
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
