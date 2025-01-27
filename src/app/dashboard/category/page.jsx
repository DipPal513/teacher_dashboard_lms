"use client";
import React, { useState } from "react";
import useFetch from "@/hook/useFetch";
import { Button, Dropdown, Menu, Skeleton, Modal, message } from "antd";
import Link from "next/link";
import axios from "axios";

export default function Page() {
  const [page, setPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(10); // Page size
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [deleteId, setDeleteId] = useState(null); // ID of the category to delete

  const { data, loading, error } = useFetch(
    `/categories/category?page=${page}&limit=${pageSize}&search=${searchQuery}`
  );

  // Ensure data is always an array
  const tableData = Array.isArray(data?.data) ? data.data : [];

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Handle delete confirmation
  const confirmDelete = async () => {
    try {
      await axios.delete(`/categories/${deleteId}`);
      message.success("Category deleted successfully!");
      setDeleteId(null); // Reset the delete ID
      setIsModalVisible(false); // Close modal
    } catch (error) {
      message.error("Failed to delete the category. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Table Name</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="mt-2 w-full md:w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <Link href={"/dashboard/category/add"}>Add</Link>
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
                  Category Name
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">
                  Category Type
                </th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">
                  Tag
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
                      {item.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {item.type}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {item.tag}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item key="1">
                              <Link
                                href={`/dashboard/category/update/${item?.id}`}
                              >
                                Update
                              </Link>
                            </Menu.Item>
                            <Menu.Item
                              key="2"
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
                        <Button>Options</Button>
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
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page} of {data?.totalPages || 1}
        </span>
        <button
          onClick={() =>
            setPage((prev) =>
              data?.totalPages && prev < data.totalPages ? prev + 1 : prev
            )
          }
          disabled={page >= (data?.totalPages || 1)}
          className={`px-4 py-2 rounded-md ${
            page >= (data?.totalPages || 1)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
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
        <p>Are you sure you want to delete this category?</p>
      </Modal>

      {/* Handle error state */}
      {error && <div className="text-red-500 mt-4">Error: {error}</div>}
    </div>
  );
}
