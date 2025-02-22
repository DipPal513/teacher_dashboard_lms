"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import {
  Button,
  Dropdown,
  Menu,
  Skeleton,
  Select,
  Modal,
  Pagination,
} from "antd";
import Link from "next/link";
import Cookies from "js-cookie";
import { base_url } from "@/utils/URL";
import toast from "react-hot-toast";
import { FaEdit, FaInfoCircle, FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { IoTrashBin } from "react-icons/io5";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  const searchParams = useSearchParams();

  // Extract course_id and search from URL
  useEffect(() => {
    
    const courseIdFromURL = searchParams.get("course_id") || "";
    const searchFromURL = searchParams.get("title") || "";

    if (courseIdFromURL) {
      setSelectedCourseId(courseIdFromURL);
      setShowContent(true);
    }

    setSearchInput(searchFromURL);
  }, [searchParams]);

  // Fetch courses
  const fetchCourses = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${base_url}/courses?orderBy=id&sortedBy=desc&page=1&limit=0`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data?.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch data when course_id or search changes
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
        `${base_url}/class-materials?orderBy=id&sortedBy=desc&page=${page}&search=${searchQuery}&searchJoin=and`,
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

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId) fetchData();
  }, [selectedCourseId, searchInput, page]);

  // Extract course_name from URL
  useEffect(() => {
    const courseNameFromURL = searchParams.get("course_name") || "";

    if (courseNameFromURL) {
      setSelectedCourseName(courseNameFromURL);
    }
  }, [searchParams]);

  // Update URL with course_name when course is selected
  const handleSearchClick = (e) => {
    e.preventDefault();
    if (selectedCourseId) {
      const selectedCourse = courses.find(course => course.id === selectedCourseId);
      const courseName = selectedCourse?.title || "";
      setSelectedCourseName(courseName);
      const newQuery = new URLSearchParams(searchParams.toString());
      newQuery.set("course_id", selectedCourseId);
      newQuery.set("course_name", courseName);
      router.push(`?${newQuery.toString()}`, { scroll: false });
      setShowContent(true);
    } else {
      toast.error("Please select a course before searching.");
    }
  };

  const handleSearchInputChange = (e) => {
    const newSearch = e.target.value;
    setSearchInput(newSearch);

    const newQuery = new URLSearchParams(searchParams.toString());
    if (newSearch) {
      newQuery.set("title", newSearch);
    } else {
      newQuery.delete("title");
    }

    router.push(`?${newQuery.toString()}`, { scroll: false });
  };

  const handleCourseSelect = (value) => {
    setSelectedCourseId(value);
    setShowContent(false)
  };

  const handleDelete = async () => {
    const token = Cookies.get("token");
    try {
      await axios.delete(`${base_url}/class-materials/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Item deleted successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      toast.error("Failed to delete item. Please try again.");
    } finally {
      setIsModalVisible(false);
      setDeleteId(null);
    }
  };
  const paginationData = data?.meta?.pagination;
  return (
    <div className="p-4 bg-white w-full">
      <form className="flex flex-col gap-4 md:flex-row md:items-center mb-3">
        <Select
          placeholder="Select a course"
          value={selectedCourseId || undefined}
          onChange={handleCourseSelect}
          className="w-full md:w-72"
        >
          {courses.map((course) => (
            <Select.Option key={course.id} value={course.id}>
              {course.title}
            </Select.Option>
          ))}
        </Select>
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          type="submit"
        >
          <FaSearch />
        </button>
      </form>

      {showContent && (
        <>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-3">
            <div>
              <h2 className="text-3xl font-bold py-2">{selectedCourseName} Materials</h2>
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchInputChange}
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
              <table className="min-w-full border border-gray-200 text-left">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">
                      Title
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">
                       Type
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">
                      Link
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
                  {data?.data?.length > 0 ? (
                    data.data.map((item, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {item.title}
                        </td>
                        <td className="py-2 text-sm text-gray-800">
                          {item.type}
                        </td>
                        <td className="py-2 text-sm text-gray-800">
                          {item.link}
                        </td>
                        <td className="py-2 text-sm text-gray-800">
                          {item.status}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-800">
                          <Dropdown
                            overlay={
                              <Menu>
                            <Menu.Item
                              key="1"
                              icon={<FaEdit />}
                              className="hover:bg-gray-100"
                            >
                              <Link
                                href={`/dashboard/class-materials/update/${item?.id}`}
                              >
                                Update
                              </Link>
                            </Menu.Item>
                            <Menu.Item
                              key="2"
                              icon={<IoTrashBin />}
                              style={{
                                backgroundColor: "rgb(248 113 113)",
                                color: "white",
                              }} // Tailwind 'bg-red-400' alternative
                              onClick={() => {
                                setDeleteId(item.id);
                                setIsModalVisible(true);
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
                        colSpan="5"
                        className="px-4 py-4 text-center text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
          </div>
        </>
      )}

      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
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