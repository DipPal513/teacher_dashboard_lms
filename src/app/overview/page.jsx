import React from "react";
import { FaHome, FaSearch, FaListAlt, FaMoneyBill, FaFileInvoice } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
   
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Transactions Summary</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Refresh</button>
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
          <h3 className="text-xl font-bold">Quick Actions</h3>
          <div className="mt-4">
            <button className="bg-green-100 text-green-600 px-4 py-2 rounded-lg flex items-center">
              <FaFileInvoice className="mr-2" />
              Invoice Generator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
