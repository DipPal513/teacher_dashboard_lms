"use client";
import React from 'react'

import { Layout, Menu, Breadcrumb, Card, Row, Col } from 'antd';


const DashboardWelcome = () => {
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Layout className="site-layout">
      
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Welcome</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Dashboard</h1>
            <p className="text-lg text-gray-600">Manage your courses and students efficiently.</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardWelcome;