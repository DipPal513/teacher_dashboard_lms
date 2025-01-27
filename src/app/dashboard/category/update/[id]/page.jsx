"use client";
import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import useFetch from "@/hook/useFetch";

const UpdateCategoryPage = () => {
  const [form] = Form.useForm();

  // Fetch category data using useFetch
  const { data, loading, error } = useFetch("/categories/category?id=VxZM0Jzb7JGXrpdk");

  // Populate form fields when data is loaded
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        categoryName: data.name || "",
        categoryType: data.categoryType || "",
        input1: data.input1 || "",
        input2: data.input2 || "",
      });
    }
  }, [data, form]);

  // Handle form submission
  const onFinish = (values) => {
    console.log("Success:", values);
    // Add your update logic here (e.g., send a PUT request to update the category)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4 bg-white w-full">
      <h2 className="mb-4 text-lg font-semibold">Update Category</h2>

      {loading ? (
        <div>Loading...</div>
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
                  { required: true, message: "Please input the category name!" },
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
                  { required: true, message: "Please input the category type!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Input 1"
                name="input1"
                rules={[
                  { required: true, message: "Please input the first field!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Input 2"
                name="input2"
                rules={[
                  { required: true, message: "Please input the second field!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UpdateCategoryPage;
