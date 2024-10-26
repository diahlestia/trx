const { Admin } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AdminController {

    // ============================== LOGIN ================================
    static async login(req, res, next) {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return next({
                name: "InvalidEmailPassword",
                msg: { message: "Email and Password are required!" },
            });
        }
    
        try {
            const result = await Admin.findOne({ where: { email } });
            
            if (result) {
                if (bcrypt.compareSync(password, result.password)) {
                    const token = jwt.sign({ id: result.id, email: result.email }, process.env.SECRET_KEY);
                    return res.status(200).json({ access_token: token, email: result.email, role: result.role });
                } else {
                    return next({
                        name: "WrongEmailPassword",
                        msg: { message: "Invalid Email / Password!" },
                    });
                }
            } else {
                return next({
                    name: "Unregistered",
                    msg: { message: "Invalid Email / Password!" },
                });
            }
        } catch (err) {
            console.error("Error during login:", err);
            return next({
                name: "InternalServerError",
                msg: "Internal Server Error",
            });
        }
    }
    

    // ============================== REGISTER ================================
    static async register(req, res, next) {
        const { firstName, lastName, email, password, birthDate, gender } = req.body;
    
        if (!firstName || !password || !email || !birthDate || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        const newAdmin = {
            firstName,
            lastName,
            email,
            password,
            birthdate: birthDate,
            gender,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    
        try {
            const data = await Admin.create(newAdmin);
            return res.status(201).json({ id: data.id, email: data.email });
        } catch (err) {
            console.error('Error creating admin:', err);
            return next({
                name: "InvalidRegister",
                msg: { message: "Invalid Email / Password" },
            });
        }
    }
    
    
    static async findAll(req, res, next) {
        try {
            const result = await Admin.findAll({ order: [['id', 'ASC']] });
            return res.status(200).json(result);
        } catch (err) {
            console.error("Error fetching admins:", err);
            return next({
                name: 'InternalServerError',
                msg: 'Internal Server Error',
            });
        }
    }
    

    static async findSpecificId(req, res, next) {
        const { id } = req.params;
    
        try {
            const admin = await Admin.findOne({ 
                where: { id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            });
    
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
    
            res.status(200).json(admin);
        } catch (err) {
            console.error("Error fetching admin by ID:", err);
            next({
                name: 'InternalServerError',
                msg: 'Internal Server Error',
            });
        }
    }
    

    static async updateAdmin(req, res, next) {

        const { id } = req.params;

        // res.json({ message: `Delete ad min with id ${id}` });

    
        const { firstName, lastName, email, password, birthDate, gender } = req.body;
    
        let editedAdmin = {
            firstName,
            lastName,
            email,
            password,
            birthdate: birthDate,
            gender,
            updatedAt: new Date(),
        };
    
        try {
            const result = await Admin.update(editedAdmin, {
                where: { id },
                returning: true,
            });
            
    
            if (result[0] === 0) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            
            const updatedAdmin = result[1][0];
            if (!updatedAdmin) {
                return res.status(404).json({ message: 'Admin not found after update' });
            }
            let data = {
                id: updatedAdmin.id,
                firstName: updatedAdmin.firstName,
                lastName: updatedAdmin.lastName,
                email: updatedAdmin.email,
                gender: updatedAdmin.gender,
                birthDate: updatedAdmin.birthDate,
                updatedAt: updatedAdmin.updatedAt,
            };
    
            res.status(200).json(data);
        } catch (err) {
            console.error("Error updating admin:", err);
            next({
                name: 'InternalServerError',
                msg: 'Internal Server Error',
            });
        }
    }
    

    static async deleteAdmin(req, res, next) {
        const { id } = req.params;
    
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
    
            await Admin.destroy({ where: { id } });
    
            res.status(200).json({ message: 'Admin has been removed' });
        } catch (err) {
            console.error("Error deleting admin:", err);
            next({
                name: 'InternalServerError',
                msg: 'Internal Server Error',
            });
        }
    }
    
}

module.exports = AdminController;
