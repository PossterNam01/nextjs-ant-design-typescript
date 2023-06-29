import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetBookById } from '../utils/GetData';
import { SaveBook, UploadFile } from '../utils/PostData';
import { Button, Form, Input } from 'antd';

export default function EditBook() {
  const router = useRouter();
  const bookId = router.query.bookId;
  const [book, setBook] = useState<IBook>();
  const [currentFilePath, setCurrentFilePath] = useState<String>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (Number(bookId) > 0) {
      const data: IBook = await GetBookById(Number(bookId));
      setCurrentFilePath(data.imageBook);
      setBook(data);
    }
  };

  const onFinish = async (values: IBook) => {
    values.imageBook = currentFilePath;
    values.bookId = Number(bookId);
    console.log(values);
    await SaveBook(values);
    window.location.href = '/book';
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeFile = async (e) => {
    const files = e.target.files;
    if (files) {
      var form_data = new FormData();
      form_data.append('file', files[0]);
      const filePath = await UploadFile(form_data, 4);
      if (filePath) {
        setCurrentFilePath(filePath);
      }
    }
  };

  return (
    <div>
      <h1>FORM Edit</h1>
      {book && (
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          style={{ maxWidth: 700, marginTop: '2rem' }}
          initialValues={{
            bookName: book.bookName,
            price: book.price,
            author: book.author,
          }}
          onFinish={async (value) => await onFinish(value)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Book Name"
            name="bookName"
            rules={[{ required: true, message: 'Please input book name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price ($)"
            name="price"
            rules={[{ required: true, message: 'Please input price!' }]}
          >
            <Input type="number" min={1} />
          </Form.Item>

          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: 'Please input author!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Upload File" name="imageBook">
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
