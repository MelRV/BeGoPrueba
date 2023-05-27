import { useState, useEffect } from "react";
import Header from "./header";
import { BiSearch, BiBusSchool, BiBox, BiExpandAlt } from "react-icons/bi";

const Order = () => {
  const [data, setData] = useState([]);

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
    window.location.href = "/cargo"; // Ruta de la página de resumen
  };

  return (
    <>
      <Header />
      <div className="flex justify-center mt-11 width-full xl:w-1/6">
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
                  <div className="flex align-items-center">
                    <p className="mt-5 ml-3">Order #{order.order_number}</p>
                  </div>
                  <div className="flex items-start p-4 bg-gray-700  w-[450px] h-[292px] text-gray-200 rounded-lg  mt-4 justify-start">
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
                          <p className="flex">
                            Pickup: {order.destinations[0].address}
                          </p>
                          <p className="flex">Dropoff: {order.destinations[1].address}</p>
                        </div>
                      </div>
                      <div className="flex ">
                        <button type="button"
                          onClick={handleResumeClick}
                          className="flex justify-center bg-yellow-500 p-4 w-40 h-auto rounded-lg mt-12 ">
                          <BiExpandAlt className="text-white mr-4 text-2xl" />
                          Resume
                        </button>
                        {/* usamos new Date con los datos del json y llamamos al metodo toLocal para 
                            que nos de le formato que necesitamos*/}
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default Order;




