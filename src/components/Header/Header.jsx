"use client";
import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Header() {
    const menu = (
        <Menu>
            <Menu.Item key="user-info" disabled>
                <div className="flex items-center">
                    <Avatar src="https://via.placeholder.com/150" />
                    <div className="ml-2">
                        <div className="font-bold">John Doe</div>
                        <div className="text-gray-500">john.doe@example.com</div>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="0" icon={<FaUser />}>
                <Link href="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<FaCog />}>
                <Link href="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" icon={<FaSignOutAlt />} style={{ color: 'red' }}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <header className="bg-white z-50 text-black p-4 fixed top-0 left-0 w-full">
            <div className="max-w-screen-xl mx-auto px-2 flex items-center justify-between">
                <div className="flex items-center ml-10 lg:ml-0">
                    <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg" alt="Logo" className="w-12 h-12 mr-2" />
                </div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <div className="flex items-center cursor-pointer">
                        <Avatar icon={<FaUser />} />
                    </div>
                </Dropdown>
            </div>
        </header>
    );
}
