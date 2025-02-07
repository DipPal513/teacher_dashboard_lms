"use client";
import useFetch from "@/hook/useFetch";
import { base_url } from "@/utils/URL";
import { Button, Form, Input, Select, Skeleton, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const UpdateCoursePage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch course data
  const {
    data,
    loading: courseLoading,
    error,
  } = useFetch(`/class-materials/${id}`);

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
        status: data?.data?.status || "draft",
        type: data?.data?.type || "video",
        link: data?.data?.link || "",
      });
    }
  }, [data, form]);

  // Handle form submission
  const onFinish = async (courseData) => {
    setSubmitting(true);
    const { ...rest } = courseData;

    const finalData = { ...rest };

    // Prepare form data
    const formData = new FormData();
    formData.append("subject_id", null);
    formData.append("course_id", data?.data?.course_id);
    formData.append("title", courseData.title);
    formData.append("status", courseData.status);
    formData.append("description", courseData.description);
    formData.append("course_id", data?.data?.course_id);
    formData.append("type", courseData.type);
    formData.append("link", courseData.link);
    formData.append("photo", null);

    try {
      await axios.patch(`${base_url}/class-materials/${id}`, finalData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Course updated successfully!");
      form.resetFields();
      router.back();
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
      <h2 className="mb-4 text-2xl font-bold">Update Course</h2>

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

            <Col span={8}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select the Type!" }]}
              >
                <Select placeholder="Select Type">
                  <Select.Option value="video">Video</Select.Option>
                  <Select.Option value="pdf">PDF</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Link"
                name="link"
                rules={[{ required: true, message: "Please input the Link!" }]}
              >
                <Input placeholder="Enter Link" />
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
