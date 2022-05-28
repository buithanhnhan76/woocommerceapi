import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';

const Products = () => {
    const [updateId,setUpdateId] = useState({});
    const [updatePrice,setUpdatePrice] = useState({});
    const [updateQuantities,setUpdateQuantities] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.put(config.baseURL + `products/${updateId}?consumer_key=ck_d3c18c39d3d7c58764a22d1939e14fb95cf3a55f&consumer_secret=cs_3f984ad7cefe669180d1e643525c4dc21b817eb3`,{'regular_price': updatePrice, 'manage_stock': true, 'stock_quantity': updateQuantities});
    }
    return ( 
        <div className='container-fluid'>
            <h1>Update Products</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
            <label>
                Id sản phẩm
                <input type="text" onChange={(e) => setUpdateId(e.target.value)}></input>
            </label>
            <br></br>
            <label>
                Giá cập nhật
                <input type="number" onChange={(e) => setUpdatePrice(e.target.value)}></input>
            </label>
            <br></br>
            <label>
                Số lượng tồn kho
                <input type="number" onChange={(e) => setUpdateQuantities(e.target.value)}></input>
            </label>
            <br></br>
            <button>Cập nhật</button>
            </form>
        </div>
     );
}
 
export default Products;