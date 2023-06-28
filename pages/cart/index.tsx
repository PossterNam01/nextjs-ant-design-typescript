'use client';
import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { GetBookList, GetMovieList } from '../utils/GetData';
import { CarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { addCart } from '../utils/PostData';
import jwtDecode from 'jwt-decode';
export const URL_IMAGE = 'http://localhost:8080';

export default function Cart() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [userToken, setUserToken] = useState<ITokenObject>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res: IBook[] = await GetBookList();
    const token = localStorage.getItem('token');

    if (token) {
      const convertToObject: ITokenObject = jwtDecode(token);
      setUserToken(convertToObject);
    }
    if (res) {
      setBooks(res);
    }
  };

  const addShoppingCartByUser = async (data: ICart) => {
    await addCart(data)
  }

  return (
    <div className="flex">
      {books &&
        books.map((item: IBook) => (
          <div key={item.bookId}>
            <SwiperSlide>
              <div
                className="movie-card"
                style={{
                  background: `url(${
                    URL_IMAGE + item.imageBook
                  }) no-repeat center / cover `,
                }}
              >
                <div className="movie-card-content text-white">
                  <p>{item.bookName}</p>
                  {item.price}$
                  <button onClick={async () => addShoppingCartByUser({bookId: item.bookId , username: userToken.sub})}>
                    <ShoppingCartOutlined style={{ fontSize: '2rem' }} />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </div>
        ))}
    </div>
  );
}
