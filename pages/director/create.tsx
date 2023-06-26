"use client"
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Upload } from 'antd';
import { useState } from 'react';
import { DeleteFile, SaveDirector, UploadFile } from '../utils/PostData';

export default function CreateDirector() {
  const [currentFilePath, setCurrentFilePath] = useState<String>('');
  const [director, setDirector] = useState<Director>();

  const onFinish = async (values: Director) => {
    const fields = { ...director };
    fields['directorName'] = values.directorName;
    fields['directorImage'] = currentFilePath;
    setDirector(fields);
    const result = await SaveDirector(fields);
    if(result){
        window.location.href = "/director"
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeFile = async (e) => {
    const files = e.target.files;

    if(currentFilePath){
        await DeleteFile(currentFilePath)
    }

    if (files) {
        var form_data = new FormData();
        form_data.append('file', files[0]);
        const filePath = await UploadFile(form_data, 2);
        if (filePath) {
          setCurrentFilePath(filePath);
        }
    }
  };

  return (
    <div>
      <h1>FORM CREATE</h1>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        style={{ maxWidth: 700, marginTop: '2rem' }}
        initialValues={{ remember: true }}
        onFinish={async (value) => await onFinish(value)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Director"
          name="directorName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Upload File" name="directorImage">
          <input
            type="file"
            onChange={async (value) => await handleChangeFile(value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } };
}
