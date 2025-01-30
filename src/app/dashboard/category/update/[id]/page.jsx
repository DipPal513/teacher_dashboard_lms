"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Skeleton } from "antd";
import useFetch from "@/hook/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { base_url } from "@/utils/URL";
import Cookies from "js-cookie";

const UpdateCategoryPage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Fetch category data using useFetch
  const { data, loading, error } = useFetch(`/categories/category?id=${id}`);

  console.log(data);
  // Populate form fields when data is loaded
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        categoryName: data.name || "",
        categoryType: "category" || "",
      });
    }
  }, [data, form]);

  // Handle form submission
  const onFinish = (values) => {
    const { categoryName, categoryType } = values;
    setSubmitting(true);
    axios
      .patch(
        `${base_url}/categories/${id}`,
        {
          name: categoryName,
          type: "category",
          parent_id: null,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        
        toast.success("Category updated successfully!");
        console.log("Success:", response.data);
        form.resetFields(); // Clear form fields after success
        router.push("/dashboard/category");
      })
      .catch((error) => {
        toast.error("Failed to update category.");
        console.error("Error:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4 bg-white w-full">
      <h2 className="mb-4 text-lg font-semibold">Update Category</h2>

      {loading ? (
        <div>
          <Skeleton active />
        </div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <Form
          form={form}
          name="update-category"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Category Name"
                name="categoryName"
                rules={[
                  {
                    required: true,
                    message: "Please input the category name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Category Type"
                name="categoryType"
                rules={[
                  {
                    required: true,
                    message: "Please input the category type!",
                  },
                ]}
              >
                <Input />
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

export default UpdateCategoryPage;
