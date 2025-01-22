"use client";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  FaBars,
  FaWpforms,
  FaTable,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";

export default function SideMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative h-screen">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-lg"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen transition-transform duration-300 bg-white shadow-lg z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{ width: "270px" }}
      >
        <Sidebar
          breakPoint="lg"
          width="270px"
          className="h-full sidebar_menu pt-20"
          collapsedWidth="80px"
          style={{ backgroundColor: "#fff", color: "#000" }}
        >
          {/* Logo Section */}
          <div className="logo p-5 text-center border-b border-gray-200">
            <img
              src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
              alt="Logo"
              className="max-w-full mx-auto h-20 rounded-md"
            />
          </div>

          {/* Menu Items */}
          <Menu>
            <MenuItem icon={<FaWpforms className="text-pink-400" />}>
              <Link href={"/account_settings"}>Account Settings</Link>
            </MenuItem>
            <MenuItem icon={<FaTable className="text-orange-400" />}>
              <Link href={"/table"}>Table</Link>
            </MenuItem>
            <MenuItem icon={<FaSignInAlt className="text-purple-400" />}>
              <Link href={"/login"}>Login</Link>
            </MenuItem>
            <MenuItem icon={<FaUser className="text-cyan-400" />}>
              <Link href={'/profile'}>Profile</Link>
            </MenuItem>
            <MenuItem icon={<FaUser className="text-cyan-400" />}>
              <Link href={'/overview'}>Overview</Link>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
