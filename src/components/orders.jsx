import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';

const Orders = () => {
    const [ordersInTheLast7Days, setOrdersInTheLast7Days] = useState([]);

    const getAllOrdersInTheLast7Days = async () => {
        // Get all orders in the last 7 days
        const getOrders = await axios.get(config.baseURL + "orders?consumer_key=ck_d3c18c39d3d7c58764a22d1939e14fb95cf3a55f&consumer_secret=cs_3f984ad7cefe669180d1e643525c4dc21b817eb3&after=2022-05-22T00:00:00&before=2022-05-29T00:00:00");
        console.log(getOrders);
        if(getOrders.status === 200){
            setOrdersInTheLast7Days(getOrders.data);
        }
    }
    return (
        <div className='container-fluid'>
            <h1 className='container-fluid'>Orders</h1>
            <div>
                {ordersInTheLast7Days.length !== 0 && 
                ordersInTheLast7Days.map(order => 
                <div>
                    <p>id: {order.id}</p>
                    <p>Ngày tạo: {order.date_created.slice(0,10)}</p>
                </div>
                )
                }
            </div>
            <button onClick={() => getAllOrdersInTheLast7Days()}>Get all orders in the last 7 days</button>
        </div> 
     );
}
 
export default Orders;