import React,{useState} from 'react';
import config from '../config/config';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

const Products = () => {
    const [updateId,setUpdateId] = useState({});
    const [updatePrice,setUpdatePrice] = useState({});
    const [updateQuantities,setUpdateQuantities] = useState({});

    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [listDeleteId, setListDeleteId] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        config.updateProduct(updateId,updatePrice,updateQuantities);
    }

    const handleGetAllProducts = async () => {
        const result = await config.getAllProducts();
        setAllProducts(result);
    }

    const handleDeleteProduct = async (productId) => {
        const result = await config.deleteProduct(productId);
        if(result.status === 200)
        {   
            toast.success("Delete success");
            setAllProducts([...allProducts.filter(product => product.id !== productId)]);
        }
    }

    const renderPageItems = (items, pageSize) => {
        let startIndex = pageSize * currentPage;
        // console.log(startIndex);
        const renderItems = items.slice(startIndex, startIndex + pageSize);
        return renderItems.map(product => {
            return ( 
            <div className="m-3">
                <h3 className='text-secondary'>Name: {product.name}</h3>
                <p>Id: {product.id}</p>
                <p>Price: {product.price}</p>
                <p>Stock quantity: {product.stock_quantity}</p>
                <button className='btn btn-danger' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                <hr></hr>
            </div>
            );
        })
    }

    const handleAutoDeleteProducts = async () => {
        if(allProducts.length === 0){
            toast.success("Please get all products first !");
            return;
        }
        let listDeleteId = [];
        for(let i = 0; i < allProducts.length; i++){
            if(allProducts[i].sale_price < 500000){
                listDeleteId.push(allProducts[i].id);
            }
        }
        
        for(let i = 0; i < listDeleteId.length; i++){
            const result = await config.deleteProduct(listDeleteId[i]);
            if(result.status === 200){
                toast.success("Delete success");
            }
            else{
                toast("fail");
                listDeleteId.splice(i,1);
                i--;
            }
        }
        let newListProducts = allProducts.filter(product => !listDeleteId.includes(product.id));
        setAllProducts(newListProducts);
    }

    return ( 
        <div className='container-fluid'>
            {allProducts.length !== 0 &&
                <div>
                    {renderPageItems(allProducts, 5)}
                    <ReactPaginate 
                        pageCount={Math.ceil(allProducts.length/5)}
                        pageRangeDisplayed={3}
                        previousLabel="Previous"
                        nextLabel="Next"
                        onPageChange={(selected) => setCurrentPage(selected.selected)}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        forcePage={currentPage}
                        renderOnZeroPageCount={null}
                    />
                </div>
            }
            <button className='btn btn-success mt-2' onClick={() => handleGetAllProducts()}>Get all Products</button>
            <div>
                <h2>Update Products</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Id sản phẩm: 
                    <input type="text" required onChange={(e) => setUpdateId(e.target.value)} className="d-block"></input>
                </label>
                <br></br>
                <label>
                    Giá cập nhật:
                    <input type="number" required onChange={(e) => setUpdatePrice(e.target.value)} className="d-block"></input>
                </label>
                <br></br>
                <label>
                    Số lượng tồn kho: 
                    <input type="number" required onChange={(e) => setUpdateQuantities(e.target.value)} className="d-block"></input>
                </label>
                <br></br>
                <button className='btn btn-success mb-3'>Cập nhật</button>
                </form>
            </div>
            <button className='btn btn-success' onClick={() => handleAutoDeleteProducts()}>Auto Delete Products Less Than 500k</button>
        </div>
     );
}
 
export default Products;