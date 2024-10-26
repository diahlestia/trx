const express = require('express');
const router = express.Router();
const Authentication = require("../middlewares/authentication");

const AdminController = require('../controllers/admin.controller')
const ProductController = require('../controllers/product.controller')

router.post("/login", AdminController.login);
router.post("/register", AdminController.register);

// router.use(Authentication);

router.get('/Admins', AdminController.findAll)
router.get('/Admin/:id', AdminController.findSpecificId)
router.put('/Admin/:id', AdminController.updateAdmin)
router.delete('/Admin/:id', AdminController.deleteAdmin)

router.get('/products', ProductController.findAll)
router.get('/product/:id', ProductController.findSpecificId)
router.post('/product', ProductController.createproduct)
router.put('/product/:id', ProductController.updateproduct)
router.delete('/product/:id', ProductController.deleteproduct)
 

module.exports = router