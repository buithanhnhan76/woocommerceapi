import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
    const [ordersInTheLast7Days, setOrdersInTheLast7Days] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const getAllOrdersInTheLast7Days = async () => {
        // Get all orders in the last 7 days
        const getOrders = await axios.get(config.allOrdersForTheLast7Days);
        if(getOrders.status === 200){
            setOrdersInTheLast7Days(getOrders.data);
        }
    }
    const handleGetAllOrders = async () => {
        const result = await config.getAllOrders();
        setAllOrders(result);
    }

    const deleteProductValueLessThan15k = async () => {
        let listDeletedId = [];
        if(allOrders.length === 0){
            toast.success("Please get all the orders first !");
            return;
        }
        for(let i = 0; i < allOrders.length; i++){
            if(allOrders[i].total <= 15000){
                listDeletedId.push(allOrders[i].id);
            }
        }
        for(let i =0; i < listDeletedId.length; i++){
            const result = await config.deleteOrder(listDeletedId[i]);
            if(result.status === 200){
                toast.success("Delete success");
            }
            else{
                listDeletedId.splice(i,1);
                i--;
            }
        }
        const newListAllOrders = allOrders.filter(order => !listDeletedId.includes(order.id));
        setAllOrders(newListAllOrders);
    }

    return (
        <div className='container-fluid'>
            <h1>Orders</h1>
            {
            allOrders.length !== 0 && allOrders.map(order => {
            return (
            <div className='m-3'>
                <p>id: {order.id}</p>
                    <p>Ngày tạo: {order.date_created.slice(0,10)}</p>
                    <p>Phương thức thanh toán : {order.payment_method_title}</p>
                    <p>Tình trạng: {order.status}</p>
                    <p>Tổng số tiền: {order.total}</p>
                    <hr></hr>
            </div>
            )})
            }
            <button className='btn btn-success mt-2' onClick={() => handleGetAllOrders()}>Get all Orders</button>
            <div>
                {ordersInTheLast7Days.length !== 0 && 
                ordersInTheLast7Days.map(order => 
                <div class="m-3">
                    <p>id: {order.id}</p>
                    <p>Ngày tạo: {order.date_created.slice(0,10)}</p>
                    <p>Phương thức thanh toán : {order.payment_method_title}</p>
                    <p>Tình trạng: {order.status}</p>
                    <p>Tổng số tiền: {order.total}</p>
                    <hr></hr>
                </div>
                )
                }
            </div>
            <button onClick={() => getAllOrdersInTheLast7Days()} className="btn btn-success mt-3">Get all orders in the last 7 days</button>
            <button class="btn btn-success d-block mt-3" onClick={() => deleteProductValueLessThan15k()}>Delete orders value less than 15k</button>
        </div> 
     );
}
 
export default Orders;