import React from "react";
import { Layout, Menu } from "antd";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorsPage from "./pages/doctorsPage";
import NursesPage from "./pages/nursesPage";

const { Header, Content } = Layout;

const App: React.FC = () => (
  <Router basename="/medical-staff-tracking">
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/doctors">Врачи</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/nurses">Медсестры</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <Routes>
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/nurses" element={<NursesPage />} />
        </Routes>
      </Content>
    </Layout>
  </Router>
);

export default App;
