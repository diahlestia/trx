import { useState } from 'react';
import axios from 'axios';

export default function ProductForm({ onProductChange }) {
    const [product, setProduct] = useState({ id: '', name: '', price: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product.id) {
            await axios.put('/api/products', product);
        } else {
            await axios.post('/api/products', product);
        }
        setProduct({ id: '', name: '', price: '' });
        onProductChange();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Product Name" 
                value={product.name} 
                onChange={(e) => setProduct({ ...product, name: e.target.value })} 
                required 
            />
            <input 
                type="number" 
                placeholder="Product Price" 
                value={product.price} 
                onChange={(e) => setProduct({ ...product, price: e.target.value })} 
                required 
            />
            <button type="submit">Save Product</button>
        </form>
    );
}
