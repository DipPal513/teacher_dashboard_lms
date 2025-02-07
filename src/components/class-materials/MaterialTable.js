"use client";
import React, { useState } from "react";
import { Skeleton, Dropdown, Menu, Button } from "antd";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import { IoTrashBin } from "react-icons/io5";

export function MaterialTable({ data,onDeleteHandler }) {
     
    
    return (
        <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-gray-100 border-b">
                <tr>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">
                        Title
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">
                        Type
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">
                        Link
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">
                        Status
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.data?.length > 0 ? (
                    data.data.map((item, index) => (
                        <tr
                            key={index}
                            className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                        >
                            <td className="px-4 py-2 text-sm text-gray-800">
                                {item.title}
                            </td>
                            <td className="py-2 text-sm text-gray-800">
                                {item.type}
                            </td>
                            <td className="py-2 text-sm text-gray-800">
                                {item.link}
                            </td>
                            <td className="py-2 text-sm text-gray-800">
                                {item.status}
                            </td>
                            <td className="px-2 py-2 text-sm text-gray-800">
                                <Dropdown
                                    overlay={
                                        <Menu>
                                        <Menu.Item
                                          key="1"
                                          icon={<FaEdit />}
                                          className="hover:bg-gray-100"
                                        >
                                          <Link
                                            href={`/dashboard/class-materials/update/${item?.id}`}
                                          >
                                            Update
                                          </Link>
                                        </Menu.Item>
                                        <Menu.Item
                                          key="2"
                                          icon={<IoTrashBin />}
                                          style={{
                                            backgroundColor: "rgb(248 113 113)",
                                            color: "white",
                                          }} // Tailwind 'bg-red-400' alternative
                                          onClick={() => {
                                            setDeleteId(item.id);
                                            setIsModalVisible(true);
                                          }}
                                        >
                                          Delete
                                        </Menu.Item>
                                      </Menu>
                                    }
                                >
                                    <Button>
                                        <FaInfoCircle />
                                    </Button>
                                </Dropdown>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan="5"
                            className="px-4 py-4 text-center text-gray-500"
                        >
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
