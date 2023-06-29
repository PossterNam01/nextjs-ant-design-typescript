import axios from 'axios';
import { promises } from 'dns';
// authentication
export const LoginUser = async (data: FormData) => {
  try {
    const response = await fetch('http://localhost:8080/api/login', {
      body: data,
      method: 'POST',
    });

    const d = await response.json();
    localStorage.setItem('token', d.access_token);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const LogoutUser = async () => {
  const config = {
    headers: {
      ' Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
  };
  const response = await axios.get('http://localhost:8080/api/logout', config);
  localStorage.removeItem('token');
  window.location.href = '/authentication/sign-in';
};

// Directory
export const SaveDirector = async function (
  director: IDirector,
): Promise<IDirector> {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const response = await axios
      .post('http://localhost:8080/api/view/directory/save', director, config)
      .then((res) => {
        res.data;
      });

    console.log(response);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
  return;
};

//book
export const SaveBook = async function (book: IBook): Promise<IBook> {
  try {
    const res: IBook = await axios
      .post('http://localhost:8080/api/view/book/save', book)
      .then((res) => res.data);
    return res;
  } catch (error) {}
  return;
};
// Cart

export const addCart = async function (data: ICart): Promise<ICart> {
  try {
    const res: ICart = await axios
      .post('http://localhost:8080/api/view/shopping_cart/add', data)
      .then((res) => res.data);
    return res;
  } catch (error) {
    return;
  }
};

// order
export const addToOrder = async function (data: IOrder[]) {
  try {
    const res  = await axios.post("http://localhost:8080/api/view/order_book",data)
  } catch (error) {
    console.log(error)
  }
}

// Upload file
// 1: movie , 2 director , 3 cast
export const UploadFile = async function (
  data: FormData,
  type: number,
): Promise<String> {
  let API = 'http://localhost:8080/api/admin/movie/image';

  const config = {
    headers: {
      ' Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'multipart/form-data',
    },
  };

  if (type == 2) {
    API = 'http://localhost:8080/api/admin/director/image';
  } else if (type == 3) {
    API = 'http://localhost:8080/api/admin/cast/image';
  } else if (type == 4) {
    API = 'http://localhost:8080/api/admin/book/image';
  }

  try {
    const response = await axios.post(API, data, config).then((res) => {
      return res.data;
    });

    return response;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export const DeleteFile = async function (
  currentFilePath: String,
): Promise<String> {
  try {
    const config = {
      headers: {
        ' Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    };

    const response = await axios.post(
      'http://localhost:8080/api/admin/delete/file',
      { filePath: currentFilePath },
      config,
    );
    if (response.status == 200) {
      return 'Ok';
    } else {
      return 'False';
    }
  } catch (error) {
    console.log(error);
    return 'False';
  }
};
