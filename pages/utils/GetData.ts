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

// Shopping Cart

export const GetShoppingCartByUser = async function (
  userId: string,
): Promise<IShoppingCartBook[]> {
  const res: IShoppingCartBook[] = await fetch(
    'http://localhost:8080/api/view/shopping_cart/view/' + userId,
  ).then((data) => data.json());

  return res;
};
