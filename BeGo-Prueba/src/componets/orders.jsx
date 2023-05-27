import { useState, useEffect } from "react";
import { BiSearch, BiBusSchool, BiBox, BiExpandAlt } from "react-icons/bi";
import Header from "./header";

const Order = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showAllOrders, setShowAllOrders] = useState(true);

  useEffect(() => {
    fetch(
      "https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming"
    )
      .then((result) => result.json())
      .then((data) => {
        setData(data);
        let address = data.result[0].destinations[0].address;
        console.log(address);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResumeClick = (orderId) => {
    window.location.href = `/cargo/${orderId}`; // Ruta de la página de información de la orden
  };

  const handleSearch = () => {
    const filteredOrders = data.result.filter(
      (order) => order.order_number === searchText
    );
    setFilteredData(filteredOrders);
    setShowAllOrders(false);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center mt-11 width-full xl:w-1/6">
        <button type="submit" onClick={handleSearch}>
          <BiSearch className="text-white ml-7 text-2xl bg-gray" />
        </button>
        <input
          className="bg-transparent border-x-0 border-t-0 border-b-1 width-full mr-3 px-2 leading-tight focus:outline-none text-white"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex justify-center mx-auto">
        <div className="md:col-span-3 flex relative">
          <ul>
            {showAllOrders &&
              Array.isArray(data.result) &&
              data.result.map((order) => (
                <li key={order._id} className="relative text-white">
                  <div className="flex align-items-center">
                    <p className="mt-5 ml-3">Order #{order.order_number}</p>
                  </div>
                  <div className="flex items-start p-4 bg-gray-900 w-[450px] h-[292px] text-gray-200 rounded-lg mt-4 justify-start">
                    <div className="flex flex-wrap">
                      <div className="flex justify-center">
                        <BiBusSchool className="text-white ml-7" />
                        <p className="flex mr-[100px] ">{order.type}</p>
                      </div>
                      <div className="flex justify-center">
                        <p>{order.status_string}</p>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex p-2">
                          <BiBox className="text-white text-5xl ml-7" />
                          <div className="flex flex-col">
                            <p className="flex">
                              Pickup: {order.destinations[0].address}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => handleResumeClick(order._id)}
                          className="flex justify-center bg-yellow-500 p-4 w-40 h-auto rounded-lg mt-12"
                        >
                          <BiExpandAlt className="text-white mr-4 text-2xl" />
                          Resume
                        </button>
                        <div className="flex flex-col">
                          <p className="flex">
                            {new Date(order.start_date).toLocaleDateString(
                              "es-ES"
                            )}
                          </p>
                          <p className="flex ml-2 justify-end">
                            {new Date(order.start_date).toLocaleDateString(
                              "es-ES"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            {!showAllOrders &&
              Array.isArray(filteredData) &&
              filteredData.map((order) => (
                <li key={order._id} className="relative text-white">
                  {/* Contenido de la orden filtrada */}
                  <div className="flex align-items-center">
                    <p className="mt-5 ml-3">Order #{order.order_number}</p>
                  </div>
                  <div className="flex items-start p-4 bg-gray-700 w-[450px] h-[292px] text-gray-200 rounded-lg mt-4 justify-start">
                    <div className="flex flex-wrap">
                      <div className="flex justify-center">
                        <BiBusSchool className="text-white ml-7" />
                        <p className="flex mr-[100px] ">{order.type}</p>
                      </div>
                      <div className="flex justify-center">
                        <p>{order.status_string}</p>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex p-2">
                          <BiBox className="text-white text-5xl ml-7" />
                          <div className="flex flex-col">
                            <p className="flex">
                              Pickup: {order.destinations[0].address}
                            </p>
                            <p className="flex">
                              Dropoff: {order.destinations[1].address}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => handleResumeClick(order._id)}
                          className="flex justify-center bg-yellow-500 p-4 w-40 h-auto rounded-lg mt-12"
                        >
                          <BiExpandAlt className="text-white mr-4 text-2xl" />
                          Resume
                        </button>
                        <div className="flex flex-col">
                          <p className="flex">
                            {new Date(order.start_date).toLocaleDateString(
                              "es-ES"
                            )}
                          </p>
                          <p className="flex ml-2 justify-end">
                            {new Date(order.start_date).toLocaleDateString(
                              "es-ES"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Resto del contenido de la orden */}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Order;

