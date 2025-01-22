"use client";
import React, { useState } from "react";
import { Table, Button, Input, Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const initialData = [
  {
    key: "1",
    trxId: "123456",
    merchantTrxId: "654321",
    amount: 100,
    ratio: 1.2,
    charge: 5,
    receivedAmount: 95,
    payType: "Credit Card",
    bankTrxId: "789012",
    payeeName: "John Doe",
    status: "Completed",
  },
  {
    key: "1",
    trxId: "123456",
    merchantTrxId: "654321",
    amount: 100,
    ratio: 1.2,
    charge: 5,
    receivedAmount: 95,
    payType: "Credit Card",
    bankTrxId: "789012",
    payeeName: "John Doe",
    status: "Completed",
  },
  {
    key: "1",
    trxId: "123456",
    merchantTrxId: "654321",
    amount: 100,
    ratio: 1.2,
    charge: 5,
    receivedAmount: 95,
    payType: "Credit Card",
    bankTrxId: "789012",
    payeeName: "John Doe",
    status: "Completed",
  },
  // Add more demo data here
];

const columns = [
  { title: "Trx ID", dataIndex: "trxId", key: "trxId" },
  {
    title: "Merchant Trx ID",
    dataIndex: "merchantTrxId",
    key: "merchantTrxId",
  },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Ratio", dataIndex: "ratio", key: "ratio" },
  { title: "Charge", dataIndex: "charge", key: "charge" },
  {
    title: "Received Amount",
    dataIndex: "receivedAmount",
    key: "receivedAmount",
  },
  { title: "Pay Type", dataIndex: "payType", key: "payType" },
  { title: "Bank Trx ID", dataIndex: "bankTrxId", key: "bankTrxId" },
  { title: "Payee Name", dataIndex: "payeeName", key: "payeeName" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu>
        }
      >
        <EllipsisOutlined />
      </Dropdown>
    ),
  },
  { title: "Refund", dataIndex: "refund", key: "refund" },
];

export default function Page() {
  const [data, setData] = useState(initialData);

  return (
    <div className="p-4 bg-white w-full">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: 16,
        }}
        className="header-container"
      >
        <div>
          <h2 className="mb-3">Table Name</h2>
          <Input.Search
            placeholder="Search..."
            className="mb-4"
            style={{ width: "100%", maxWidth: 300 }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button type="primary">Add</Button>
          <Button>Export</Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: true }} />
    </div>
  );
}
