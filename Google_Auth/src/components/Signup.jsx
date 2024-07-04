import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { Form, Input, Button, message, Divider, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
const { Title } = Typography;


const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://login-server-a3na.onrender.com/api/auth/signup",
        values,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setOtpSent(true);
        setUserId(response.data.userId);
        message.success("OTP sent to your email");
      } else if (response.status === 400) {
        message.error(
          response.data.msg || "Signup failed. User already exists."
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data) {
        message.error(
          error.response.data.msg || "Signup failed. Please try again."
        );
      } else {
        message.error("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onOtpFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://login-server-a3na.onrender.com/api/auth/verify-otp",
        { userId, otp: values.otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        message.success("OTP verified. You can now log in.");
        navigate("/login");
      } else if (response.status === 400) {
        message.error(response.data.msg || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      if (error.response && error.response.data) {
        message.error(
          error.response.data.msg ||
            "OTP verification failed. Please try again."
        );
      } else {
        message.error("OTP verification failed. Please try again.");
      }
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
      message.error("Google authentication failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 , marginTop:"95px"}}>
      <Title level={2} style={{ textAlign: "center" }}>
        Signup
      </Title>
      {!otpSent ? (
        <Form
          name="signup-form"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Signup
            </Button>
          </Form.Item>
          <Divider>Or login with Google</Divider>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Signup Failed")}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </div>
        </Form>
      ) : (
        <Form
          name="otp-form"
          onFinish={onOtpFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Please enter the OTP!" }]}
          >
            <Input placeholder="OTP" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Signup;
