"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Dropdown, Menu, Skeleton, Modal, Pagination } from "antd";
import Link from "next/link";
import Cookies from "js-cookie";
import { base_url } from "@/utils/URL";
import toast from "react-hot-toast";
import { FaArrowLeft, FaArrowRight, FaInfoCircle } from "react-icons/fa";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(10); // Page size
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [searchInput, setSearchInput] = useState(""); // Temp search input
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [deleteId, setDeleteId] = useState(null); // ID of the category to delete

  // Fetch data using Axios
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${base_url}/courses?orderBy=id&sortedBy=desc&page=${page}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      console.log("courses data", response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, searchQuery]);
  const paginationData = data?.meta?.pagination;
  console.log("pagination:", paginationData);
  // Handle search when the input changes
  const handleSearch = (e) => {
    setSearchInput(e.target.value); // Update the temp search input state
    setSearchQuery(e.target.value); // Trigger data fetch with updated query
    setPage(1); // Reset to the first page
  };

  // Handle delete confirmation
  const confirmDelete = async () => {
    try {
      const token = Cookies.get("token");
      console.log("this is delete id: ", deleteId);
      await axios.delete(`${base_url}/categories/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Course deleted successfully!");
      setDeleteId(null); // Reset the delete ID
      setIsModalVisible(false); // Close modal
      fetchData(); // Refresh data after deletion
    } catch (error) {
      toast.error("Failed to delete the Course. Please try again.");
      console.log(error);
    }
  };

  // Ensure data is always an array
  const tableData = data?.data && Array.isArray(data.data) ? data?.data : [];

  return (
    <div className="p-4 bg-white w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-3">
        <div>
          <h2 className="text-lg font-semibold">Courses</h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput} // Use temporary input state
              onInput={handleSearch} // Update temp state
              className="mt-2 w-full md:w-72 px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <Link href={"/dashboard/courses/add"}>Add</Link>
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            Export
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-4">
            <Skeleton active />
          </div>
        ) : (
          <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">
                  Course Name
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">
                  Course Type
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {item.title}
                    </td>
                    <td className=" py-2 text-sm text-gray-800">
                      {item.coordinator_name}
                    </td>
                    <td className=" py-2 text-sm text-gray-800">
                      {item.status}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-800">
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item key="1" className="bg-blue-300">
                              <Link
                                href={`/dashboard/courses/update/${item?.id}`}
                              >
                                Update
                              </Link>
                            </Menu.Item>
                            <Menu.Item
                              key="2"
                              className="bg-red-300"
                              onClick={() => {
                                setDeleteId(item.id); // Set the ID to delete
                                setIsModalVisible(true); // Show modal
                              }}
                            >
                              Delete
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button>
                          <FaInfoCircle />
                        </Button>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Pagination
          current={paginationData?.current_page}
          total={paginationData?.total || 0} // Assuming `total` is the total number of items from API
          pageSize={pageSize}
          onChange={(pageNumber) => setPage(pageNumber)}
          showSizeChanger={false} // Hides page size changer
        />
      </div>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={confirmDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this Course?</p>
      </Modal>

      {/* Handle error state */}
      {error && <div className="text-red-500 mt-4">Error: {error}</div>}
    </div>
  );
}
