import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { GetOrderHistoryByUser } from '../utils/GetData';
import { URL_IMAGE } from '../cart';

export default function OrderHistoryBook() {
  const [listCart, setListCart] = useState<IOrderHistory[]>([]);
  const [userToken, setUserToken] = useState<ITokenObject>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [listChoose, setListChoose] = useState<IOrder[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const convertToObject: ITokenObject = jwtDecode(token);
      setUserToken(convertToObject);
      fetchData(convertToObject.sub);
    }
  }, []);

  useEffect(() => {
    if (listChoose) {
      const d = listChoose.reduce((prev, cur) => {
        return prev + cur.amount * cur.price;
      }, 0);
      setTotalPrice(d);
    }
  }, [listChoose]);

  const fetchData = async (username: string) => {
    const data: IOrderHistory[] = await GetOrderHistoryByUser(username);
    if (data) {
      setListCart(data);
    }
  };

  return (
    <div className="container">
      <div className="flex ">
        <div className="w-full bg-white px-10 py-10">
          <div className="flex justify-between border-b ">
            <h1 className="font-semibold text-2xl">History Order</h1>
            <h2 className="font-semibold text-2xl">{listCart?.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Order Date
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Status
            </h3>
          </div>
          <div className="height-shopping-body overflow-auto overflow-x-hidden">
            {listCart &&
              listCart.map((item: IOrderHistory) => (
                <div
                  key={item.bookId}
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                >
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src={URL_IMAGE + item.imageBook}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.bookName}</span>
                      <span className="text-red-500 text-xs">Book</span>
                      <a
                        href="#"
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      >
                        {/* Remove */}
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <input
                      className="mx-2 border text-center w-20"
                      type="number"
                      value={item.amount}
                      disabled
                    />
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ${item.price}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {new Date(item.orderDate).toLocaleDateString()}
                  </span>
                  <div className="flex justify-center w-1/5">
                    {item.status == 1 ? <span className='text-yellow-600'>AWAIT ACCESS</span> : <span className='text-green-500'>SHIPPING</span>}
                  </div>
                </div>
              ))}
          </div>

          {/* <a
            href="#"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </a> */}
        </div>
      </div>
    </div>
  );
}
