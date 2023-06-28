import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetDirector } from '../utils/GetData';
import { SaveDirector, UploadFile } from '../utils/PostData';
import { Button, Form, Input } from 'antd';

export default function Edit() {
  const router = useRouter();
  const directorId = router.query.directorId;
  const [director, setDirector] = useState<IDirector>();
  const [currentFilePath, setCurrentFilePath] = useState<String>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (Number(directorId) > 0) {
      const data = await GetDirector(Number(directorId));
      setCurrentFilePath(data.directorImage);
      setDirector(data);
    }
  };

  const onFinish = async (values: IDirector) => {
    const fields = { ...director };
    fields['directorName'] = values.directorName;
    fields['directorImage'] = currentFilePath;
    fields['directorId'] = Number(directorId);
    setDirector(fields);
    await SaveDirector(fields);
    window.location.href = '/director';
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeFile = async (e) => {
    const files = e.target.files;
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
      <h1>FORM Edit</h1>
      {director && (
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          style={{ maxWidth: 700, marginTop: '2rem' }}
          initialValues={{ directorName: director.directorName }}
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
      )}
    </div>
  );
}
