interface IDirector {
  directorId: number;
  directorName: String;
  directorImage: String;
}

interface IMovie {
  createByEmail: String;
  createById: String;
  createByName: String;
  description: String;
  directorId: number;
  directorName: String;
  directorImage: String;
  id: number;
  casts: ICate[];
  movieCate: IMovieCate[];
  rated: String;
  releaseDate: String;
  runningTime: String;
  startNumber: number;
  titile: String;
  trailer: String;
  thumail: String;
}

interface ICate {
  castId: number;
  castName: String;
  image: string;
}

interface IMovieCate {
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

interface IBook{
    bookId: number ,
    bookName: String,
    price: Number,
    author: String ,
    imageBook: String,
}

interface ICart{
  bookId:number ,
  username: String;
}

interface IShoppingCartBook{
  bookId: number ,
  bookName: String,
  price: number,
  author: String ,
  bookImage: String,
  amount: number,
  userId:String,
  shoppingCartId: number
}

interface IOrder{
  bookId: number,
  price: number,
  amount: number,
  bookName: String,
  userId: String,
  cartId:number
}

interface IOrderHistory{
  orderId: number, 
  bookId: number ,
  bookName: String,
  price: number,
  author: String ,
  imageBook: String,
  amount: number,
  userId:String,
  orderDate: Date, 
  codeOrder: String,
  status: number,
  address: String,
  username: String,
  totalPrice: Number,
  email: String
}
