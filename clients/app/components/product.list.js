import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await axios.get('/api/products');
        setProducts(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete('/api/products', { data: { id } });
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
