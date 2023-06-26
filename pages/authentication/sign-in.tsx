"use client";

import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LoginUser } from "../utils/PostData";

export default function SignIn() {
  const onFinish = async (values: FormLogin) => {
    var form_data = new FormData();
    form_data.append("username", values.username);
    form_data.append("password", values.password);
    const result = await LoginUser(form_data);
    
    if(result){
        window.location.href = "/";
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="sign-bg">
      <div className="login-section">
        <div className="form-box">
          <h1 className="text-white text-center mt-6 text-4xl">Login</h1>
          <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" className="form">
            <Form.Item
              className="input-box"
              label={<label className="text-white">Username</label>}
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<label className="text-white pr-1">Password</label>}
              className="input-box "
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" className="input-box" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox className="text-white">Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" className="w-full bg-cyan-500 rounded-lg" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
