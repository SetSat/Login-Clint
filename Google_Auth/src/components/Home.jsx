import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card, Layout } from "antd";
import { useTypewriter } from "react-simple-typewriter";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

function Home() {
  const user = useSelector((state) => state.auth.user);
  const [text] = useTypewriter({
    words: [user?.name || "Guest"],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: "80%", maxWidth: 600, textAlign: "center" }}>
          <Title level={1}>Welcome to the Home Page</Title>
          <Paragraph style={{ fontSize: "1.2rem" }}>
            {user ? (
              <span>Hello, <span style={{ color: "#1890ff" }}>{text}</span>!</span>
            ) : (
              "Please log in or sign up."
            )}
          </Paragraph>
        </Card>
      </Content>
    </Layout>
  );
}

export default Home;
