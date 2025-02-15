"use client";
import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Header() {
    const router = useRouter();
    const handleLogout = () => {
        // Add your logout logic here
        console.log('User logged out');
        // Show a toast notification
        toast.success('You have successfully logged out.');
        // Delete the authentication cookie using js-cookie
        Cookies.remove('token');
        // Redirect to login page
        router.push('/login');
    };

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
            <Menu.Item key="3" icon={<FaSignOutAlt />} style={{ color: 'red' }} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <header className="bg-white z-50 text-black p-4 fixed top-0 left-0 w-full">
            <div className="max-w-screen-xl mx-auto px-2 flex items-center justify-end lg:justify-between">
                <div className="lg:flex items-center hidden">
                    <img src="/mis-du.jpg" alt="Logo" className="w-full h-12 mr-2" />
                </div>
                <Dropdown overlay={menu} trigger={['click']} className=''>
                    <div className="flex items-center cursor-pointer">
                        <Avatar icon={<FaUser />} />
                    </div>
                </Dropdown>
            </div>
        </header>
    );
}
