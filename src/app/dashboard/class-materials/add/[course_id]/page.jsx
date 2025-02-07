"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { base_url } from "@/utils/URL";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Layout, Input, Button, Skeleton, Select } from "antd";

export default function AddCoursePage() {
  const { course_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const router = useRouter();
  // Fetch categories
  useEffect(() => {
    axios
      .get(`${base_url}/categories/category`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        setCategories(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setCategoriesLoading(false);
      });
  }, []);
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("all the data from the input: ",data)
    try {
      const token = Cookies.get("token");

      const requestData = {
        course_id,
        subject_id: null,
        category_id: data.category_id || null,
        title: data.title,
        description: data.description,
        faculty_id: null,
        type: data.type,
        link: data.link || null,
        time: data.time || null,
      };

      await axios.post(base_url + "/class-materials", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Course added successfully");
      setLoading(false);
      router.back();
      reset();
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add course");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
     <h1 className="text-2xl font-bold mb-4">Add New Course Material</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title field */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <Input {...field} className="mt-1 block w-full" />
            )}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
          )}
        </div>

        {/* Description field */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <Input.TextArea {...field} className="mt-1 block w-full" />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Type field */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Type <span className="text-red-500">*</span>
          </label>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field }) => (
              <Select {...field} className="mt-1 block w-full">
                <Select.Option value="video">Video</Select.Option>
                <Select.Option value="pdf">PDF</Select.Option>
              </Select>
            )}
          />
          {errors.type && (
            <p className="text-red-500 text-sm mt-2">{errors.type.message}</p>
          )}
        </div>

        {/* Link field */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Link
          </label>
          <Controller
            name="link"
            control={control}
            render={({ field }) => (
              <Input {...field} className="mt-1 block w-full" />
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full md:w-auto"
            loading={loading}
            disabled={loading}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
