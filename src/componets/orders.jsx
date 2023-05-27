import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import Header from "./header";
import { calculateTimeDifference } from "../functions";


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

  const handleResumeClick = () => {
    window.location.href = `/cargo`; // Ruta de la página de información de la orden
  };

  const handleSearch = () => {
    const filteredOrders = data.result.filter(
      (order) => order.order_number.includes(searchText)
    );
    setFilteredData(filteredOrders);
    setShowAllOrders(false);
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-12 mt-11 width-full ">
        <button type="submit" onClick={handleSearch} className="grid col-start-2 col-end-2">
          <BiSearch className="text-white ml-7 text-2xl bg-gray" />
        </button>
        <input
          className="bg-transparent border-x-0 border-t-0 border-b-1 width-full mr-3 px-2 leading-tight focus:outline-none text-white col-start-3 col-end-12"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-12">
        {showAllOrders &&
          Array.isArray(data.result) &&
          data.result.map((order) => (
            <div key={order._id} className="col-start-2 col-end-12">
              <div className="flex align-items-center">
                <p className="text-lg mt-5 ml-3">
                  Order <strong className="ml-1">#{order.order_number}</strong>
                </p>
              </div>
              <div className="card-bg rounded-[25px] flex items-start p-4 w-full text-gray-200 rounded-lg mt-4 justify-start">
                <div className="flex flex-wrap">
                  <div className="grid grid-cols-2 w-full pb-2 card-header">
                    <div className="inline-block align-center">
                      <img src="freight.svg" alt="" className="text-white-text-3xl inline-block pr-2" />
                      <span className="inline-block">{order.type}</span>
                    </div>
                    <div className="inline-block text-right mr-1">
                      <div className={`${order.status_class} inline-block mr-1`}></div>
                      <span>{order.status_string}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="grid grid-cols-[30px_minmax(120px,_1fr)_120px] w-full pb-10 items-center">
                    <div className="text-center">
                      <img src="truck.svg" alt="" className="text-white-text-3xl" />
                      <div className="spacer"></div>
                      <img src="marker.svg" alt="" className="text-white-text-3xl" />
                    </div>
                    <div className="flex flex-col ml-2">
                      <div className="w-full">
                        <span className="text-sm block">PICKUP</span>
                        <span className="text-tg block font-bold">
                          {order.destinations[0].address.split(",")[order.destinations[0].address.split(",").length-2]}
                        </span>
                        <span className="text-truncate max-h-3">
                          {order.destinations[0].address}
                        </span>
                      </div>
                      <div className="p-3"></div>
                      <div className="w-full">
                        <span className="text-sm block">DROPOFF</span>
                        <span className="text-tg block font-bold">
                          {order.destinations[1].address.split(",")[order.destinations[1].address.split(",").length-2]}
                        </span>
                        <span className="text-ellipsis">
                          {order.destinations[1].address}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col text-right">
                      <div className="w-full">
                        <span className="text-sm block">{new Date(order.start_date).toLocaleTimeString("es-ES", {hour: "2-digit",minute: "2-digit"})}</span>
                        <span className="text-tg block font-bold">
                          {new Date(order.start_date).toLocaleDateString("es-ES")}
                        </span>
                        
                      </div>
                      <div className="p-3"></div>
                      <div className="w-full">
                        <span className="text-sm block">{new Date(order.end_date).toLocaleTimeString("es-ES", {hour: "2-digit",minute: "2-digit"})}</span>
                        <span className="text-tg block font-bold">
                          {new Date(order.end_date).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full">
                    <div className="">
                    <button
                      type="button"
                      onClick={() => handleResumeClick()}
                      className="flex justify-center bg-yellow-500 p-4 left_button w-40 h-auto rounded-lg"
                      disabled={new Date() < new Date(order.start_date)}
                    >
                      {new Date() < new Date(order.start_date)
                        ? "Start pickup in" + calculateTimeDifference(new Date(order.start_date))
                        : "Navegar"}
                    </button>

                    </div>
                    <div className="text-right">
                      <button 
                        className="bg-yellow-500 text-black p-4 right_button w-40 h-auto rounded-lg align-center"
                        onClick={() => handleResumeClick()}
                        >
                        <span className="inline-block">
                          Resume
                        </span>
                        <img src="eye.svg" alt="" className=" inline-block text-white-text-3xl pl-2" /> 
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {!showAllOrders &&
          Array.isArray(filteredData) &&
          filteredData.map((order) => (
            <div key={order._id} className="col-start-2 col-end-12">
              <div className="flex align-items-center">
                <p className="text-lg mt-5 ml-3">
                  Order <strong className="ml-1">#{order.order_number}</strong>
                </p>
              </div>
              <div className="card-bg rounded-[25px] flex items-start p-4 w-full  text-gray-200 rounded-lg mt-4 justify-start">
                <div className="flex flex-wrap">
                  <div className="grid grid-cols-2 w-full pb-2 card-header">
                    <div className="inline-block align-center">
                      <img src="freight.svg" alt="" className="text-white-text-3xl inline-block pr-2" />
                      <span className="inline-block">{order.type}</span>
                    </div>
                    <div className="inline-block text-right mr-1">
                      <div className={`${order.status_class} inline-block mr-1`}></div>
                      <span>{order.status_string}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="grid grid-cols-[30px_minmax(120px,_1fr)_120px] w-full pb-10 items-center">
                    <div className="text-center">
                      <img src="truck.svg" alt="" className="text-white-text-3xl" />
                      <div className="spacer"></div>
                      <img src="marker.svg" alt="" className="text-white-text-3xl" />
                    </div>
                    <div className="flex flex-col ml-2">
                      <div className="w-full">
                        <span className="text-sm block">PICKUP</span>
                        <span className="text-tg block font-bold">
                          {order.destinations[0].address.split(",")[order.destinations[0].address.split(",").length-2]}
                        </span>
                        <span className="text-truncate max-h-3">
                          {order.destinations[0].address}
                        </span>
                      </div>
                      <div className="p-3"></div>
                      <div className="w-full">
                        <span className="text-sm block">DROPOFF</span>
                        <span className="text-tg block font-bold">
                          {order.destinations[1].address.split(",")[order.destinations[1].address.split(",").length-2]}
                        </span>
                        <span className="text-ellipsis">
                          {order.destinations[1].address}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col text-right">
                      <div className="w-full">
                        <span className="text-sm block">{new Date(order.start_date).toLocaleTimeString("es-ES", {hour: "2-digit",minute: "2-digit"})}</span>
                        <span className="text-tg block font-bold">
                          {new Date(order.start_date).toLocaleDateString("es-ES")}
                        </span>
                        
                      </div>
                      <div className="p-3"></div>
                      <div className="w-full">
                        <span className="text-sm block">{new Date(order.end_date).toLocaleTimeString("es-ES", {hour: "2-digit",minute: "2-digit"})}</span>
                        <span className="text-tg block font-bold">
                          {new Date(order.end_date).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full">
                    <div className="">
                    <button
                      type="button"
                      className="flex justify-center bg-yellow-500 p-4 left_button w-40 h-auto rounded-lg"
                      disabled={new Date() < new Date(order.start_date)}
                    >
                      {new Date() < new Date(order.start_date)
                        ? "Start pickup in" + calculateTimeDifference(new Date(order.start_date))
                        : "Navegar"}
                    </button>

                    </div>
                    <div className="text-right">
                      <button 
                        className="bg-yellow-500 text-black p-4 right_button w-40 h-auto rounded-lg align-center"
                        onClick={() => handleResumeClick()}
                        >
                        <span className="inline-block">
                          Resume
                        </span>
                        <img src="eye.svg" alt="" className=" inline-block text-white-text-3xl pl-2" /> 
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!showAllOrders && filteredData.length === 0 &&  
            <h1 className="text-red">
              No hay coincidencias
            </h1>
          }
      </div>
    </>
  );
};

export default Order;
