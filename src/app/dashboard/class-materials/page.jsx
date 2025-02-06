"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import { Skeleton, Modal } from "antd";
import Link from "next/link";
import Cookies from "js-cookie";
import { base_url } from "@/utils/URL";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { MaterialTable } from "@/components/class-materials/MaterialTable";

const SearchComponent = lazy(() => import("@/components/class-materials/SearchComponent"));

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (selectedCourseId) fetchData();
  }, [selectedCourseId, searchInput]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const token = Cookies.get("token");

    let searchQuery = `course_id:${selectedCourseId}`;
    if (searchInput) {
      searchQuery += `;title:${searchInput}`;
    }

    try {
      const response = await axios.get(
        `${base_url}/class-materials?orderBy=id&sortedBy=desc&search=${searchQuery}&searchJoin=and`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (courseId, search) => {
    setSelectedCourseId(courseId);
    setSearchInput(search);
  };

  const handleDeleteManager = (itemId, shouldVisible) => {
    setDeleteId(itemId);
    setIsModalVisible(shouldVisible);
  };

  const handleDelete = async () => {
    setIsModalVisible(true);
    const token = Cookies.get("token");
    try {
      await axios.delete(`${base_url}/class-materials/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Item deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete item. Please try again.");
    } finally {
      setIsModalVisible(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-4 bg-white w-full">
      {/* suspense */}
      <Suspense fallback={<Skeleton active />}>
        <SearchComponent onSearch={handleSearch} />
      </Suspense>

      {selectedCourseId && (
        <>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-3">
            <div>
              <h2 className="text-3xl font-bold py-2">Materials</h2>
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="mt-2 w-full md:w-72 px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <Link href={`/dashboard/class-materials/add/${selectedCourseId}`}>
              <span className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Add
              </span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-4">
                <Skeleton active />
              </div>
            ) : (
              <MaterialTable data={data} onDeleteHandler={handleDeleteManager} />
            )}
          </div>
        </>
      )}

      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </div>
  );
}
