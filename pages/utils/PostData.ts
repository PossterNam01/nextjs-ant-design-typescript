import axios from 'axios';

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
  const response = await fetch('http://localhost:8080/api/logout');
  localStorage.removeItem('token');
  window.location.href = '/authentication/sign-in';
};

// Directory
export const SaveDirector = async function (
  director: Director,
): Promise<Director> {
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
