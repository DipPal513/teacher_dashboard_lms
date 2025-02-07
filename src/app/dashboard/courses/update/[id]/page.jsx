"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Skeleton, Select } from "antd";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { base_url } from "@/utils/URL";
import Cookies from "js-cookie";
import useFetch from "@/hook/useFetch";

const UpdateCoursePage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch course data
  const { data, loading: courseLoading, error } = useFetch(`/courses/${id}`);
  console.log("courseData: ", data);
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

  // Populate form fields when course data is loaded
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data?.data?.title || "",
        description: data?.data?.description || "",
        num_classes: data?.data?.num_classes || "",
        num_exams: data?.data?.num_exams || "",
        coordinator_name: data?.data?.coordinator_name || "",
        coordinator_number: data?.data?.coordinator_number || "",
        intro_video: data?.data?.intro_video || "",
        status: data?.data?.status || "draft",
        category_id: data?.data?.category_id || null,
        photo: null,
      });
    }
  }, [data, form]);

  // Handle form submission
  const onFinish = async (courseData) => {
    setSubmitting(true);
    const { photo, ...rest } = courseData;

    const finalData = { ...rest, photo: null, subject_id: null };
    console.log("finalData", finalData);

    // Prepare form data
    const formData = new FormData();
    formData.append("subject_id", null);
    formData.append("title", courseData.title);
    // formData.append("status", courseData.status);
    formData.append("description", courseData.description);
    formData.append("num_classes", courseData.num_classes);
    formData.append("num_exams", courseData.num_exams);
    formData.append("coordinator_name", courseData.coordinator_name);
    formData.append("coordinator_number", courseData.coordinator_number);
    formData.append("intro_video", courseData.intro_video || null);
    formData.append("status", courseData.status);
    formData.append("category_id", courseData.category_id);
    formData.append("photo", null);

    try {
      await axios.patch(`${base_url}/courses/${id}`, finalData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json"
          
        },
      });
      if (courseData.status !== data?.data?.status) {
        console.log("coursedata status: ",courseData.status, "old data status: ",data?.data?.status)
        await axios.patch(
          `${base_url}/courses/${id}/status`,
          { status: courseData.status },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      toast.success("Course updated successfully!");
      form.resetFields();
      router.push("/dashboard/courses");
    } catch (error) {
      toast.error("Failed to update course.");
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <div className="p-4 bg-white w-full">
      <h2 className="mb-4 text-lg font-bold">Update Course</h2>

      {courseLoading ? (
        <Skeleton active />
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : (
        <Form
          form={form}
          name="update-course"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the Title!" }]}
          >
            <Input placeholder="Enter Title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the Description!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter Description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Number of Classes"
                name="num_classes"
                rules={[
                  {
                    required: true,
                    message: "Please input the Number of Classes!",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter Number of Classes" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Number of Exams"
                name="num_exams"
                rules={[
                  {
                    required: true,
                    message: "Please input the Number of Exams!",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter Number of Exams" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Category"
                name="category_id"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                {categoriesLoading ? (
                  <Skeleton.Input active />
                ) : (
                  <Select placeholder="Select Category">
                    {categories?.data?.map((category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Coordinator Name"
                name="coordinator_name"
                rules={[
                  {
                    required: true,
                    message: "Please input the Coordinator Name!",
                  },
                ]}
              >
                <Input placeholder="Enter Coordinator Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Coordinator Number"
                name="coordinator_number"
                rules={[
                  {
                    required: true,
                    message: "Please input the Coordinator Number!",
                  },
                ]}
              >
                <Input placeholder="Enter Coordinator Number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              {" "}
              <Form.Item
                label="Intro Video URL"
                name="intro_video"
                rules={[
                  {
                    required: true,
                    message: "Please input the Intro Video URL!",
                  },
                ]}
              >
                <Input placeholder="Enter Intro Video URL" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  { required: true, message: "Please select the Status!" },
                ]}
              >
                <Select placeholder="Select Status">
                  <Select.Option value="draft">Draft</Select.Option>
                  <Select.Option value="published">Published</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UpdateCoursePage;
