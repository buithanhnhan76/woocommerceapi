import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';

const Orders = () => {
    const [ordersInTheLast7Days, setOrdersInTheLast7Days] = useState([]);

    const getAllOrdersInTheLast7Days = async () => {
        // Get all orders in the last 7 days
        const getOrders = await axios.get(config.allOrdersForTheLast7Days);
        if(getOrders.status === 200){
            setOrdersInTheLast7Days(getOrders.data);
        }
    }
    return (
        <div className='container-fluid'>
            <h1>Orders</h1>
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
            <button onClick={() => getAllOrdersInTheLast7Days()} className="btn btn-success">Get all orders in the last 7 days</button>
        </div> 
     );
}
 
export default Orders;