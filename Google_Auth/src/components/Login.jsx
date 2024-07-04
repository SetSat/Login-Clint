import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { Form, Input, Button, Typography, Divider } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://login-server-a3na.onrender.com/api/auth/login",
        values
      );
      dispatch(setUser(response.data.user));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "https://login-server-a3na.onrender.com/api/auth/google",
        {
          token: credentialResponse.credential,
        }
      );
      dispatch(setUser(response.data.user));
      navigate("/");
    } catch (error) {
      console.error("Google authentication error:", error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px", marginTop: "110px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Login
      </Title>
      <Form name="login" onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/forgot-password">Forgot Password?</Link>
        </Form.Item>
      </Form>
      <Divider>Or login with Google</Divider>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Google Login Failed")}
        />
      </div>
    </div>
  );
}

export default Login;
