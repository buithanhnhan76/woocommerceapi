import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = "https://huynhthaomuoi.tino.page/wp-json/wc/v3/";
const consumer_key = 'ck_55d5820f804ff213ede5594ebbfa6b1204a40bdd';
const consumer_secret = 'cs_a615021af92610f1a20808df69ae939e4348d446';
// url api
const allOrdersForTheLast7Days = baseURL + `orders?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}&after=2022-06-05T00:00:00&before=2022-06-12T00:00:00`;
const allCustomerInTheLast30Days = baseURL + `customers?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}&after=2022-04-29T00:00:00&before=2022-05-29T00:00:00`;
const allProducts = baseURL + `products?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}&per_page=100`;
const allOrders = baseURL + `orders?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}&per_page=100`;
// func
const updateProduct = async (productId, updatePrice, updateQuantities) => {
    const updateData = {'regular_price': updatePrice, 'manage_stock': true, 'stock_quantity': updateQuantities};
    const updateProductUrl = baseURL + `products/${productId}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`;
    return await axios.put(updateProductUrl,updateData);
}

const getAllProducts = async () => {
    let listAllProducts = [];
    let result = null;
    let page = 1;
    do { 
        result = await axios.get(allProducts + `&page=${page}`);
    if(result.status === 200){
        listAllProducts = listAllProducts.concat(result.data);
    }
    page++;
    }
    while(result.data.length !== 0);
    return listAllProducts;
}

const getAllOrders = async () => {
    let listAllOrders = [];
    let result = null;
    let page = 1;
    do { 
        result = await axios.get(allOrders + `&page=${page}`);
    if(result.status === 200){
        listAllOrders = listAllOrders.concat(result.data);
    }
    page++;
    }
    while(result.data.length !== 0);
    return listAllOrders;
}

const deleteProduct = async (productId) => {
    const deleteProductUrl = baseURL + `products/${productId}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`;
    return await axios.delete(deleteProductUrl);
}

const deleteOrder = async (orderId) => {
    const deleteOrderUrl = baseURL + `orders/${orderId}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`;
    return await axios.delete(deleteOrderUrl);
}


export default {
    baseURL,
    consumer_key,
    consumer_secret,
    allOrdersForTheLast7Days,
    allCustomerInTheLast30Days,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getAllOrders,
    deleteOrder,
}