import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { GetOrderByManager } from '../utils/GetData';
import Link from 'next/link';

export default function OrderManagerBook() {
  const [listCart, setListCart] = useState<IOrderHistory[]>([]);
  const [userToken, setUserToken] = useState<ITokenObject>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [listChoose, setListChoose] = useState<IOrder[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const convertToObject: ITokenObject = jwtDecode(token);
      setUserToken(convertToObject);
      fetchData();
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

  const fetchData = async () => {
    const data: IOrderHistory[] = await GetOrderByManager();
    if (data) {
      setListCart(data);
    }
  };

  return (
    <div className="container">
      <div className="flex ">
        <div className="w-full bg-white px-10 py-10">
          <div className="flex justify-between border-b ">
            <h1 className="font-semibold text-2xl">List Order</h1>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              USERNAME
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              EMAIL
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              CODE ORDER
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Order Date
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Status
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-2/5 ">
              Action
            </h3>
          </div>
          <div className="height-shopping-body overflow-auto overflow-x-hidden">
            {listCart &&
              listCart.map((item: IOrderHistory) => (
                <div
                  key={item.bookId}
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                >
                  <div className="flex justify-center w-1/5">
                    {item.username}
                  </div>
                  <div className="flex justify-center w-1/5">{item.email}</div>
                  <div className="flex justify-center w-1/5">
                    {item.codeOrder}
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {new Date(item.orderDate).toLocaleDateString()}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ${item.totalPrice}
                  </span>

                  <div className="flex justify-center w-1/5">
                    {item.status == 1 ? (
                      <span className="text-yellow-600">AWAIT ACCESS</span>
                    ) : (
                      <span className="text-green-500">SHIPPING</span>
                    )}
                  </div>
                  <div className="flex justify-center w-2/5">
                    <button className="bg-green-500 text-white w-24 rounded-lg mr-1">
                      Access
                    </button>
                    <Link href={"/order/"+item.codeOrder}>
                      <button className="bg-gray-500 text-white w-24 rounded-lg">
                        Detail
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
