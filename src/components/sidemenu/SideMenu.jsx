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
import { usePathname } from "next/navigation";

export default function SideMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => pathname === path; // Fixed: Using `pathname`
  console.log(pathname)

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
          

          {/* Menu Items */}
          <Menu>
            <MenuItem
              active={isActive("/dashboard/form")}
              icon={<FaWpforms className="text-pink-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/dashboard/form") ? "bg-blue-200" : ""
              }`}
            >
              <Link href={"/dashboard/form"}>Form</Link>
            </MenuItem>
            <MenuItem
              active={isActive("/dashboard/table")}
              icon={<FaTable className="text-orange-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/dashboard/table") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/dashboard/table"}>Table</Link>
            </MenuItem>
           
            <MenuItem
              active={isActive("/dashboard/profile")}
              icon={<FaUser className="text-cyan-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/dashboard/profile") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/dashboard/profile"}>Profile</Link>
            </MenuItem>
            <MenuItem
              active={isActive("/dashboard/category")}
              icon={<FaUser className="text-cyan-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/dashboard/category") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/dashboard/category"}>Category</Link>
            </MenuItem>
            <SubMenu
              label="More"
              icon={<FaCog className="text-green-400" />}
              className="text-black hover:text-blue-500"
            >
              <MenuItem
                active={isActive("/dashboard/settings")}
                className={`text-black hover:text-blue-500 ${
                  isActive("/dashboard/settings") ? "bg-blue-100" : ""
                }`}
              >
                <Link href={"/dashboard/settings"}>Settings</Link>
              </MenuItem>
              <MenuItem
                active={isActive("/notifications")}
                className={`text-black hover:text-blue-500 ${
                  isActive("/notifications") ? "bg-blue-100" : ""
                }`}
              >
                <Link href={"/notifications"}>Notifications</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem
              active={isActive("/analytics")}
              icon={<FaChartPie className="text-red-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/analytics") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/analytics"}>Analytics</Link>
            </MenuItem>
            <MenuItem
              active={isActive("/messages")}
              icon={<FaEnvelope className="text-blue-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/messages") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/messages"}>Messages</Link>
            </MenuItem>
            <MenuItem
              active={isActive("/alerts")}
              icon={<FaBell className="text-yellow-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/alerts") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/alerts"}>Alerts</Link>
            </MenuItem>
            <MenuItem
              active={isActive("/calendar")}
              icon={<FaCalendar className="text-green-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/calendar") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/calendar"}>Calendar</Link>
            </MenuItem>
            <MenuItem
              active={isActive("/documents")}
              icon={<FaFileAlt className="text-gray-400" />}
              className={`text-black hover:text-blue-500 ${
                isActive("/documents") ? "bg-blue-100" : ""
              }`}
            >
              <Link href={"/documents"}>Documents</Link>
            </MenuItem>
            <MenuItem
              active={isActive("/reports")}
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
