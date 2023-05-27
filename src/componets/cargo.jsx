import { useState, useEffect  } from "react"
//import {  BiBusSchool, BiBox } from "react-icons/bi";
import Header from "./header";

const Cargo = () => {
    const [info, setInfo] = useState({});
    const [order, setOrder] = useState({});

    useEffect(() => {
        fetch("https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders")
            .then((resultado) => resultado.json())
            .then((data) => {
                console.log("type:", typeof data.result, data.result)
                setInfo(data.result);
                setOrder(data.result);
                console.log(info)
            })
            .catch(error => {
                // this.setState({ error: error.message } )
                console.log(error);
            })        
    }, []);

    return (
        <>
         <Header />
        <div className="grid grid-cols-12">
            {Object.keys(info).length !== 0 &&
            <div key={order._id} className="col-start-2 col-end-12">
                <div className="card-bg rounded-[25px] flex items-start p-4 w-full  text-gray-200 rounded-lg mt-4 justify-start">
                    <div className="flex flex-wrap">
                    <div className="grid w-full pb-2 card-header align-center">
                        <div className="inline-block">
                        <p className="text-white-text-3xl inline-block pr-2">Referencia</p>
                        <span className="inline-block text-white">{order.reference_number}</span>
                        </div>
                        <div className="inline-block text-right mr-1">
                        <div className="flex align-items-center">
                          <p className="text-sm mt-5 ml-3">
                          Order <strong className="ml-1">#{order.order_number}</strong>
                          </p>
                        </div>
                        <div className={`${order.status_class} inline-block mr-1`}></div>
                        <span>{order.status_string}</span>
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-[30px_minmax(120px,_1fr)_120px] w-full pb-10 items-center">
                        <div className="text-center">
                        <div className="border-solid border-yellow-500">   
                        <img src="truck.svg" alt="" className="text-white-text-3xl bg-yellow-500 rounded-full p-1" />
                        </div> 
                        <div className="spacer"></div> 
                        <img src="marker.svg" alt="" className="text-white-text-3xl"/>
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
                    </div>
                </div>
                </div>
            }
        </div>
        </>
    )
}
export default Cargo