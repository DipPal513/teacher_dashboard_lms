"use client";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBars,
  FaWpforms,
  FaTable,
  FaSignInAlt,
  FaUser,
  FaChartPie,
  FaCog,
  FaEnvelope,
  FaBell,
  FaCalendar,
  FaFileAlt,
  FaChartLine,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SideMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => router.asPath === path;

  return (
    <div className="relative h-screen">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-black p-2 rounded-md "
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
          style={{ backgroundColor: "#fff !important", color: "#000" }}
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
            <MenuItem
              icon={<FaWpforms className="text-pink-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/form") ? "bg-blue-200" : ""
              }`}
            >
              <Link href={"/form"}>Form</Link>
            </MenuItem>
            <MenuItem
              icon={<FaTable className="text-orange-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/table") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/table"}>Table</Link>
            </MenuItem>
            <MenuItem
              icon={<FaSignInAlt className="text-purple-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/login") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/login"}>Login</Link>
            </MenuItem>
            <MenuItem
              icon={<FaUser className="text-cyan-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/profile") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/profile"}>Profile</Link>
            </MenuItem>
            <MenuItem
              icon={<FaUser className="text-cyan-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/overview") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/overview"}>Overview</Link>
            </MenuItem>
            <SubMenu
              label="More"
              icon={<FaCog className="text-green-400" />}
              className="text-black hover:text-blue-500"
            >
              <MenuItem
                className={`text-black hover:text-blue-500 ${
                  isActive("/settings") ? "bg-blue-100" : ""
                }`}
              >
                <Link href={"/settings"}>Settings</Link>
              </MenuItem>
              <MenuItem
                className={`text-black hover:text-blue-500 ${
                  isActive("/notifications") ? "bg-blue-100" : ""
                }`}
              >
                <Link href={"/notifications"}>Notifications</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem
              icon={<FaChartPie className="text-red-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/analytics") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/analytics"}>Analytics</Link>
            </MenuItem>
            <MenuItem
              icon={<FaEnvelope className="text-blue-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/messages") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/messages"}>Messages</Link>
            </MenuItem>
            <MenuItem
              icon={<FaBell className="text-yellow-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/alerts") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/alerts"}>Alerts</Link>
            </MenuItem>
            <MenuItem
              icon={<FaCalendar className="text-green-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/calendar") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/calendar"}>Calendar</Link>
            </MenuItem>
            <MenuItem
              icon={<FaFileAlt className="text-gray-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/documents") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/documents"}>Documents</Link>
            </MenuItem>
            <MenuItem
              icon={<FaChartLine className="text-purple-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/reports") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/reports"}>Reports</Link>
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
