interface Director {
  directorId: number;
  directorName: String;
  directorImage: String;
}

interface Movie {
  createByEmail: String;
  createById: String;
  createByName: String;
  description: String;
  directorId: number;
  directorName: String;
  directorImage: String;
  id: number;
  casts: Cate[];
  movieCate: MovieCate[];
  rated: String;
  releaseDate: String;
  runningTime: String;
  startNumber: number;
  titile: String;
  trailer: String;
}

interface Cate {
  castId: number;
  castName: String;
  image: string;
}

interface MovieCate {
  categoryId: number;
  categoryName: String;
  createByUserEmail: String;
  createByUserId: String;
  createByUserName: String;
  parentCateId: number;
  parentCateName: String;
  status: number;
}

interface FormLogin {
  username: string;
  password: string;
}

interface ITokenObject {
  sub: string;
  tokens: [];
  iss: String;
  exp: Number;
}
