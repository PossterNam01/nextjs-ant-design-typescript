import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { GetShoppingCartByUser } from '../utils/GetData';
import { URL_IMAGE } from '../cart';
import { addToOrder } from '../utils/PostData';

export default function OrderBook() {
  const [listCart, setListCart] = useState<IShoppingCartBook[]>([]);
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
    const data: IShoppingCartBook[] = await GetShoppingCartByUser(username);
    if (data) {
      setListCart(data);
    }
  };

  const handleChoose = (e: any, data: IOrder) => {
    const checked = e.target.checked;
    if (checked) {
      setListChoose((current) => [...current, data]);
    } else {
      setListChoose(listChoose.filter((x) => x.bookId != data.bookId));
    }
  };

  const setAmount = (value: number, bookId: number) => {
    const newState = listCart.map((obj) => {
      // 👇️ if id equals , update amount property
      if (obj.bookId === bookId) {
        return { ...obj, amount: value };
      }

      // 👇️ otherwise return the object as is
      return obj;
    });
    if (listChoose) {
      const updateListChoose = listChoose.map((obj) => {
        // 👇️ if id equals , update amount property
        if (obj.bookId === bookId) {
          return { ...obj, amount: value };
        }

        // 👇️ otherwise return the object as is
        return obj;
      });

      setListChoose(updateListChoose);
    }

    setListCart(newState);
  };

  const order = async () => {
    await addToOrder(listChoose);
    console.log(listChoose);
  };

  return (
    <div className="container">
      <div className="flex ">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b ">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{listCart?.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              {/* <input className=" border text-center w-8" type="checkbox" /> */}
            </h3>
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
              Total
            </h3>
          </div>
          <div className="height-shopping-body overflow-auto overflow-x-hidden">
            {listCart &&
              listCart.map((item: IShoppingCartBook) => (
                <div
                  key={item.bookId}
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                >
                  <span className="text-center w-1/5 font-semibold text-sm">
                    <input
                      className="mx-2 border text-center w-8"
                      type="checkbox"
                      id="check"
                      onChange={(value) =>
                        handleChoose(value, {
                          bookId: item.bookId,
                          amount: item.amount,
                          price: item.price,
                          bookName: item.bookName,
                          userId: item.userId,
                          cartId: item.shoppingCartId,
                        })
                      }
                    />
                  </span>
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src={URL_IMAGE + item.bookImage}
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
                        Remove
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <input
                      className="mx-2 border text-center w-20"
                      type="number"
                      value={item.amount}
                      min={1}
                      onChange={(e) =>
                        setAmount(Number(e.target.value), item.bookId)
                      }
                    />
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ${item.price}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ${item.price * item.amount}
                  </span>
                </div>
              ))}
          </div>

          <a
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
          </a>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10 ">
          <h1 className="font-semibold text-2xl border-b pb-3">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items 3</span>
            <span className="font-semibold text-sm">{totalPrice}$</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10">
            <label className="font-semibold inline-block mb-3 text-sm uppercase">
              List item
            </label>
            <div className="overflow-auto overflow-x-hidden">
              {listChoose &&
                listChoose.map((item: IOrder) => (
                  <span
                    key={item.bookId}
                    className="block p-2 text-gray-600 w-full text-sm"
                  >
                    {item.bookName +
                      ' x' +
                      item.amount +
                      ' price: ' +
                      item.amount * item.price +
                      '$'}
                  </span>
                ))}
            </div>
          </div>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${totalPrice + 10}</span>
            </div>
            <button
              onClick={async() => await order()}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
