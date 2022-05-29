import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';

const Customers = () => {
    const [customersInTheLast30Days, setCustomersInTheLast30Days] = useState([]);

    const getAllCustomersInTheLast30Days = async () => {
        // Get all customers in the last 30 days
        const getCustomers = await axios.get(config.allCustomerInTheLast30Days);
        if(getCustomers.status === 200){
            setCustomersInTheLast30Days(getCustomers.data);
        }
    }
    return (
        <div className='container-fluid'>
            <h1>Customers</h1>
            <div>
                {customersInTheLast30Days.length !== 0 && 
                customersInTheLast30Days.map(customer => 
                <div>
                    <p>id: {customer.id}</p>
                    <p>Ngày tạo: {customer.date_created.slice(0,10)}</p>
                </div>
                )
                }
            </div>
            <button onClick={() => getAllCustomersInTheLast30Days()} className="btn btn-success">Get all customers in the last 30 days</button>
        </div> 
     );
}
 
export default Customers;