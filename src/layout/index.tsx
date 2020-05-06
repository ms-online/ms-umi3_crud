import React from 'react';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default () => {
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="title">米修在线</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">采购记录</Menu.Item>
          <Menu.Item key="2">关于我们</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        ></Header>
        <Content
          className="site-layout-background"
          style={{ margin: '24px 16px', padding: 24, minHeight: 'max-content' }}
        >
          Content
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          umi3/typescript/mock @2021 Create by 米修在线
        </Footer>
      </Layout>
    </Layout>
  );
};
