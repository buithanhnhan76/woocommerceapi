import axios from 'axios';

const baseURL = "https://huynhthaomuoi.tino.page/wp-json/wc/v3/";
const consumer_key = 'ck_3de514354b1a79d8dc1bc96dfe889cbc3305a04b';
const consumer_secret = 'cs_4bf9212b477cd3c8e7ce9e3f26dcb78133be3d86';
// url api
const allOrdersForTheLast7Days = baseURL + `orders?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}&after=2022-05-22T00:00:00&before=2022-05-29T00:00:00`;
const allCustomerInTheLast30Days = baseURL + `customers?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}&after=2022-04-29T00:00:00&before=2022-05-29T00:00:00`;
// func
const updateProduct = async (productId, updatePrice, updateQuantities) => {
    const updateData = {'regular_price': updatePrice, 'manage_stock': true, 'stock_quantity': updateQuantities};
    const updateProductUrl = baseURL + `products/${productId}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`;
    const result = await axios.put(updateProductUrl,updateData);
    if( result.status === 200){
        alert("Success");
    }
}

export default {
    baseURL,
    consumer_key,
    consumer_secret,
    allOrdersForTheLast7Days,
    allCustomerInTheLast30Days,
    updateProduct
}