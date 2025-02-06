"use client";
// this is search component
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import Cookies from "js-cookie";
import { base_url } from "@/utils/URL";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchComponent({ onSearch }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchCourses();
    const courseIdFromURL = searchParams.get("course_id") || "";
    const searchFromURL = searchParams.get("title") || "";

    if (courseIdFromURL) {
      setSelectedCourseId(courseIdFromURL);
    }

    setSearchInput(searchFromURL);
  }, [searchParams]);

  const fetchCourses = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${base_url}/courses?orderBy=id&sortedBy=desc&page=1&limit=0`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(response.data?.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (selectedCourseId) {
      const newQuery = new URLSearchParams(searchParams.toString());
      newQuery.set("course_id", selectedCourseId);
      router.push(`?${newQuery.toString()}`, { scroll: false });

      onSearch(selectedCourseId, searchInput);
    } else {
      toast.error("Please select a course before searching.");
    }
  };

  return (
    <form className="flex flex-col gap-4 md:flex-row md:items-center mb-3">
      <Select
        placeholder="Select a course"
        value={selectedCourseId || undefined}
        onChange={setSelectedCourseId}
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
  );
}
