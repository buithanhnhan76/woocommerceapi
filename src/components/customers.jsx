import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';

const Customers = () => {
    const [customersInTheLast30Days, setCustomersInTheLast30Days] = useState([]);

    const getAllCustomersInTheLast30Days = async () => {
        // Get all customers in the last 30 days
        const getCustomers = await axios.get(config.baseURL + "customers?consumer_key=ck_d3c18c39d3d7c58764a22d1939e14fb95cf3a55f&consumer_secret=cs_3f984ad7cefe669180d1e643525c4dc21b817eb3&after=2022-05-01T00:00:00&before=2022-06-01T00:00:00");
        if(getCustomers.status === 200){
            setCustomersInTheLast30Days(getCustomers.data);
        }
    }
    return (
        <div className='container-fluid'>
            <h1 className='container-fluid'>Customers</h1>
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
            <button onClick={() => getAllCustomersInTheLast30Days()}>Get all customers in the last 30 days</button>
        </div> 
     );
}
 
export default Customers;