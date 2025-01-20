import React from "react";
import { FaListAlt, FaFileInvoice } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center">
          {/* Profile Picture */}
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-blue-500"
          />
          <div className="ml-6">
            {/* Name and Details */}
            <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
            <p className="text-gray-600">Member since: January 2023</p>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="p-4 mb-6 bg-yellow-200 text-yellow-800 rounded-lg">
        Payment Gateway SMS notifications are currently under maintenance. We apologize for the inconvenience.
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="bg-red-100 text-red-500 p-4 rounded-full">
              <FaListAlt size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Today's Total Transaction</p>
              <p className="text-lg font-bold">0.00 ৳</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="bg-green-100 text-green-500 p-4 rounded-full">
              <FaListAlt size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Yesterday's Total Transaction</p>
              <p className="text-lg font-bold">0.00 ৳</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="bg-orange-100 text-orange-500 p-4 rounded-full">
              <FaListAlt size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Current Month Total Transaction</p>
              <p className="text-lg font-bold">275.00 ৳</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="bg-blue-100 text-blue-500 p-4 rounded-full">
              <FaListAlt size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Previous Month Total Transaction</p>
              <p className="text-lg font-bold">199485.60 ৳</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div>
          <button className="bg-green-100 text-green-600 px-4 py-2 rounded-lg flex items-center">
            <FaFileInvoice className="mr-2" />
            Invoice Generator
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
