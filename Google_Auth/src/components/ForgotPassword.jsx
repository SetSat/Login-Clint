import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined, NumberOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSendOTP = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("https://login-server-a3na.onrender.com/api/auth/forgot-password", values);
      setUserId(response.data.userId);
      setStep(2);
      message.success(response.data.msg);
    } catch (error) {
      console.error("Error sending OTP:", error);
      message.error("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      await axios.post("https://login-server-a3na.onrender.com/api/auth/reset-password", { ...values, userId });
      console.log(values)
      console.log(userId)
      message.success("Password reset successful");
      setStep(1);
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px", marginTop: "110px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        {step === 1 ? "Forgot Password" : "Reset Password"}
      </Title>
      {step === 1 ? (
        <Form name="forgot-password" onFinish={handleSendOTP}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form name="reset-password" onFinish={handleResetPassword}>
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Please enter the OTP!" }]}
          >
            <Input prefix={<NumberOutlined />} placeholder="OTP" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: "Please enter your new password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ForgotPassword;
