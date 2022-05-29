import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';

const Products = () => {
    const [updateId,setUpdateId] = useState({});
    const [updatePrice,setUpdatePrice] = useState({});
    const [updateQuantities,setUpdateQuantities] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        config.updateProduct(updateId,updatePrice,updateQuantities);
    }
    return ( 
        <div className='container-fluid'>
            <h1>Update Products</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
            <label>
                Id sản phẩm: 
                <input type="text" onChange={(e) => setUpdateId(e.target.value)} className="d-block"></input>
            </label>
            <br></br>
            <label>
                Giá cập nhật: 
                <input type="number" onChange={(e) => setUpdatePrice(e.target.value)} className="d-block"></input>
            </label>
            <br></br>
            <label>
                Số lượng tồn kho: 
                <input type="number" onChange={(e) => setUpdateQuantities(e.target.value)} className="d-block"></input>
            </label>
            <br></br>
            <button className='btn btn-success'>Cập nhật</button>
            </form>
        </div>
     );
}
 
export default Products;