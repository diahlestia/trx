import { products } from '../../data/products'; 

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(products);
    } else if (req.method === 'POST') {
        const newProduct = req.body;
        products.push(newProduct);
        res.status(201).json(newProduct);
    } else if (req.method === 'PUT') {
        const { id, ...updatedProduct } = req.body;
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            res.status(200).json(products[index]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
