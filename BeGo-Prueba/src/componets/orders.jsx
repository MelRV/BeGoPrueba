import { useState, useEffect } from "react";
import Header from "./header";
import { BiSearch, BiBusSchool } from "react-icons/bi";

const Order = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming"
    )
      .then((result) => result.json())
      .then((data) => setData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center mt-11 width-full">
        <button type="submit">
          <BiSearch className="text-white ml-7 text-2xl bg-gray" />
        </button>
        <input
          className="bg-transparent border-x-0 border-t-0 border-b-1 width-full mr-3 px-2 leading-tight focus:outline-none text-white"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex justify-center mx-auto">
        <div className="md:col-span-3 flex relative">
          <ul>
            {Array.isArray(data.result) &&
              data.result.map((order) => (
                //verificamos que sea un array para usar el método map
                <li key={order._id} className="relative text-white">
                  <div className="flex align-items-center ">
                    <p className="mt-5 ml-3">Order #{order.order_number}</p>
                  </div>
                  <div className="flex items-start p-4 bg-gray-900 w-[350px] h-[292px] text-gray-200 rounded-lg  mt-4 justify-start">
                    <div className="flex items-start" >
                        <div className="flex justif">
                            <BiBusSchool className="text-white ml-7 " />
                            <p className="flex mr-[100px]">{order.type}</p>
                        </div>
                        <div className="flex justify-center">
                            <p>{order.status_string}</p>
                        </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Order;

