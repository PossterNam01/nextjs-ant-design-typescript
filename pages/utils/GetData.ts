import axios from 'axios';

// Director
export const GetDirectorList = async function (): Promise<IDirector[]> {
  const res: IDirector[] = await fetch(
    'http://localhost:8080/api/view/director',
  ).then((data) => data.json());

  return res;
};

export const GetDirector = async function (id: number): Promise<IDirector> {
  const res: IDirector = await fetch(
    'http://localhost:8080/api/view/directory/get/' + id,
  ).then((data) => data.json());

  return res;
};

// Movie

export const GetMovieList = async function (): Promise<IMovie[]> {
  const res: IMovie[] = await fetch(
    'http://localhost:8080/api/view/movies',
  ).then((data) => data.json());

  return res;
};

// Book
export const GetBookList = async function (): Promise<IBook[]> {
  const res: IBook[] = await fetch(
    'http://localhost:8080/api/view/list_book',
  ).then((data) => data.json());
  return res;
};

export const GetBookById = async function (id: Number): Promise<IBook> {
  const res: IBook = await fetch(
    'http://localhost:8080/api/view/list_book/' + id,
  ).then((data) => data.json());
  return res;
};

export const DeleteBookById = async (id: Number) => {
  const res = await fetch('http://localhost:8080/api/view/book_delete/' + id);

  console.log(res);
};

// Shopping Cart

export const GetShoppingCartByUser = async function (
  userId: string,
): Promise<IShoppingCartBook[]> {
  const res: IShoppingCartBook[] = await fetch(
    'http://localhost:8080/api/view/shopping_cart/view/' + userId,
  ).then((data) => data.json());

  return res;
};

// get order history by user
export const GetOrderHistoryByUser = async function (
  userId: string,
): Promise<IOrderHistory[]> {
  const res: IOrderHistory[] = await fetch(
    'http://localhost:8080/api/view/order_view/' + userId,
  ).then((data) => data.json());

  return res;
};

export const GetOrderByManager = async function (): Promise<IOrderHistory[]> {
  const res: IOrderHistory[] = await fetch(
    'http://localhost:8080/api/view/order_view/manager',
  ).then((data) => data.json());

  return res;
};
