import axios from 'axios';
import { promises } from 'dns';
import { URL_API } from './APPCONFIG';
// authentication
export const LoginUser = async (data: FormData) => {
  try {
    const response = await fetch(URL_API + '/login', {
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
      ' Authorization': 'Bearer ' + getToken(),
    },
  };
  const response = await axios.get(URL_API + '/logout', config);
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
        ' Authorization': 'Bearer ' + getToken(),
      },
    };
    const response = await axios
      .post(URL_API + '/view/directory/save', director, config)
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
      .post(URL_API + '/view/book/save', book)
      .then((res) => res.data);
    return res;
  } catch (error) {}
  return;
};
// Cart

export const addCart = async function (data: ICart): Promise<ICart> {
  try {
    const res: ICart = await axios
      .post(URL_API + '/view/shopping_cart/add', data)
      .then((res) => res.data);
    return res;
  } catch (error) {
    return;
  }
};

// order
export const addToOrder = async function (data: IOrder[]) {
  try {
    const res = await axios.post(URL_API + '/view/order_book', data);
  } catch (error) {
    console.log(error);
  }
};

// Upload file
// 1: movie , 2 director , 3 cast
export const UploadFile = async function (
  data: FormData,
  type: number,
): Promise<String> {
  let API = URL_API + '/admin/movie/image';

  const configs = {
    headers: {
      ' Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'multipart/form-data',
    },
  };

  if (type == 2) {
    API = URL_API + '/admin/director/image';
  } else if (type == 3) {
    API = URL_API + '/admin/cast/image';
  } else if (type == 4) {
    API = URL_API + 'admin/book/image';
  }

  try {
    const response = await axios.post(API, data, configs).then((res) => {
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
        ' Authorization': 'Bearer ' + getToken(),
      },
    };
    const response = await axios.post(
      URL_API + '/admin/delete/file',
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
