"use client"
import React from "react";
import { 
  Form, Input, Button, Select, DatePicker, Checkbox, Radio, 
  Switch, Upload, InputNumber, Rate, Slider, TreeSelect, 
  Cascader, TimePicker, Mentions 
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const DashboardForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="dashboard-form-container" style={{ padding: "2rem", backgroundColor: "#fff", borderRadius: "8px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "24px", color: "#333" }}>Dashboard Form</h2>
      
      <Form
        name="dashboard_form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
        style={{  padding: "2rem", borderRadius: "8px", }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Select placeholder="Select gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[{ required: true, message: "Please select your date of birth!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Agree to terms"
          name="agreement"
          valuePropName="checked"
          rules={[{ required: true, message: "You must agree to the terms and conditions!" }]}
        >
          <Checkbox>
            I agree to the terms and conditions
          </Checkbox>
        </Form.Item>

        <Form.Item
          label="Newsletter"
          name="newsletter"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Upload Profile Picture"
          name="upload"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Radio Group"
          name="radioGroup"
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Radio.Group>
            <Radio value="option1">Option 1</Radio>
            <Radio value="option2">Option 2</Radio>
            <Radio value="option3">Option 3</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Slider"
          name="slider"
        >
          <Slider />
        </Form.Item>

        <Form.Item
          label="Rate"
          name="rate"
        >
          <Rate />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%", backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DashboardForm;
