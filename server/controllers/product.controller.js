const { Product } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class ProductController {

    // ============================== REGISTER ================================
    static async createproduct(req, res, next) {
        const { name, description, image, category, stock } = req.body;
    
        if (!name || !category || !stock) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //! todo: need to handle function to upload images
    
        const newProduct = {
            name,
            description,
            image,
            category,
            stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    
        try {
            const data = await Product.create(newProduct);
            return res.status(201).json({ id: data.id, name: data.name, image: data.image });
        } catch (err) {
            console.error('Error creating Product:', err);
            return next({
                name: "ProductNotCreated",
                msg: { message: "Invalid product" },
            });
        }
    }
    
    
    static async findAll(req, res, next) {
        try {
            const result = await Product.findAll({ order: [['id', 'ASC']] });
            return res.status(200).json(result);
        } catch (err) {
            console.error("Error fetching Products:", err);
            return next({
                name: 'InternalServerError',
                msg: 'Internal Server Error',
            });
        }
    }
    

    static async findSpecificId(req, res, next) {
        const { id } = req.params;
    
        try {
            const Product = await Product.findOne({ 
                where: { id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            });
    
            if (!Product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            res.status(200).json(Product);
        } catch (err) {
            console.error("Error fetching Product by ID:", err);
            next({
                name: 'InternalServerError',
                msg: 'Internal Server Error',
            });
        }
    }
    

    static async updateproduct(req, res, next) {

        const { id } = req.params;
    
        const { name, description, image, category, stock } = req.body;
    
        let editedProduct = {
            name,
            description,
            image,
            category,
            stock,
            updatedAt: new Date(),
        };
    
        try {
            const result = await Product.update(editedProduct, {
                where: { id },
                returning: true,
            });
            
    
            if (result[0] === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            const updatedProduct = result[1][0];
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found after update' });
            }
            let data = {
                id: updatedProduct.id,
                name: updatedProduct.name,
                updatedAt: updatedProduct.updatedAt,
            };
    
            res.status(200).json(data);
        } catch (err) {
            console.error("Error updating Product:", err);
            next({
                name: 'InternalServerError',
                msg: 'Internal Server Error',
            });
        }
    }
    

    static async deleteproduct(req, res, next) {
        const { id } = req.params;
    
        try {
            const Product = await Product.findByPk(id);
            if (!Product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            await Product.destroy({ where: { id } });
    
            res.status(200).json({ message: 'Product has been removed' });
        } catch (err) {
            console.error("Error deleting Product:", err);
            next({
                name: 'InternalServerError',
                msg: 'Internal Server Error',
            });
        }
    }
    
}

module.exports = ProductController;
