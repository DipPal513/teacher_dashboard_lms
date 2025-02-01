"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { base_url } from "@/utils/URL";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState("category");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!type) newErrors.type = "Type is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = Cookies.get("token");
      await axios.post(
        base_url + "/categories",
        { name, type:"category", parent_id: null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Category added successfully");
      setName("");

      setType("");
      router.push("/dashboard/category");
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit} className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="col-span-1 ">
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className=" py-2 px-4 bg-blue-600 text-white font-semibold rounded-md"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}
