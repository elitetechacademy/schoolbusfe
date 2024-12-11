import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { MenuItems } from './components/common/MenuItems';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Brand from './pages/Brand';
import Model from './pages/Model';
import Header from './components/common/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Content, Footer, Sider } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <MenuItems />
          </Sider>
          <Layout>
            <Content style={{ margin: '0 5px' }} >
              <div
                style={{
                  padding: 15,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Header />
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="/vehicle/*">
                      <Route index path="brand" element={<Brand />} />
                      <Route path="model" element={<Model />} />
                    </Route>
                    <Route path="contact" element={<Contact />} />
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                  </Routes>
              </div>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Elitetechacademy ©{new Date().getFullYear()} Created by Elitetech
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </>
  );
};
export default App;