"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { base_url } from "@/utils/URL";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Layout, Input, Button, Skeleton, Select } from "antd";

export default function AddCoursePage() {
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

    try {
      const token = Cookies.get("token");

      const requestData = {
        subject_id: null,
        category_id: data.category_id || null,
        title: data.title,
        description: data.description,
        num_classes: data.num_classes,
        num_exams: data.num_exams,
        coordinator_name: data.coordinator_name,
        coordinator_number: data.coordinator_number,
        intro_video: data.intro_video,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        photo: null,
      };

      await axios.post(base_url + "/courses", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Course added successfully");
      setLoading(false);
      router.push("/dashboard/courses");
      reset();
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add course");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
     <h1 className="text-2xl font-bold mb-4">Add New Course</h1>

     

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

        {/* Coordinator Name */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Coordinator Name <span className="text-red-500">*</span>
          </label>
          <Controller
            name="coordinator_name"
            control={control}
            rules={{ required: "Coordinator Name is required" }}
            render={({ field }) => (
              <Input {...field} className="mt-1 block w-full" />
            )}
          />
          {errors.coordinator_name && (
            <p className="text-red-500 text-sm mt-2">
              {errors.coordinator_name.message}
            </p>
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

        {/* Number of Classes */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Number of Classes <span className="text-red-500">*</span>
          </label>
          <Controller
            name="num_classes"
            control={control}
            rules={{ required: "Number of classes is required" }}
            render={({ field }) => (
              <Input type="number" {...field} className="mt-1 block w-full" />
            )}
          />
          {errors.num_classes && (
            <p className="text-red-500 text-sm mt-2">
              {errors.num_classes.message}
            </p>
          )}
        </div>

        {/* Number of Exams */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Number of Exams <span className="text-red-500">*</span>
          </label>
          <Controller
            name="num_exams"
            control={control}
            rules={{ required: "Number of exams is required" }}
            render={({ field }) => (
              <Input type="number" {...field} className="mt-1 block w-full" />
            )}
          />
          {errors.num_exams && (
            <p className="text-red-500 text-sm mt-2">
              {errors.num_exams.message}
            </p>
          )}
        </div>

        {/* Coordinator Number */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Coordinator Number
          </label>
          <Controller
            name="coordinator_number"
            control={control}
            render={({ field }) => (
              <Input {...field} className="mt-1 block w-full" />
            )}
          />
        </div>

        {/* Intro Video */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Intro Video <span className="text-red-500">*</span>
          </label>
          <Controller
            name="intro_video"
            control={control}
            rules={{ required: "Intro Video is required" }}
            render={({ field }) => (
              <Input type="url" {...field} className="mt-1 block w-full" />
            )}
          />
          {errors.intro_video && (
            <p className="text-red-500 text-sm mt-2">
              {errors.intro_video.message}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <Input type="date" {...field} className="mt-1 block w-full" />
            )}
          />
        </div>

        {/* End Date */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <Input type="date" {...field} className="mt-1 block w-full" />
            )}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <Controller
            name="category_id"
            control={control}
            rules={{ required: "Please select a category!" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select Category"
                className="mt-1 block w-full"
              >
                {categoriesLoading ? (
                  <Skeleton.Input active />
                ) : (
                  categories?.data?.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))
                )}
              </Select>
            )}
          />
          {errors.category_id && (
            <p className="text-red-500 text-sm mt-2">
              {errors.category_id.message}
            </p>
          )}
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
            Add          </Button>
        </div>
      </form>
    </div>
  );
}
