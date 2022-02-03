const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginControler');
const productController = require('./src/controllers/productController');
const multerConfig = require('./src/middlewares/multerConfig');
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.homePage); // Não executa a função

// Rotas dos produtos normais
route.get('/products', homeController.productsIndex);

// Rotas das promoções
route.get('/promocao', homeController.saleIndex);

// Rotas dos detalhes
route.get('/productDetails/:id', homeController.showDatails);

// Rotas para cadastro de produtos
route.get('/product/index', loginRequired, productController.productsIndexList, productController.addProduct);
route.post('/product/register', loginRequired, multerConfig, productController.register, productController.productsIndexList);

// Rotas de edição
route.get('/product/index/details/:id', loginRequired, productController.editIndex);
route.post('/product/update/:id', loginRequired, multerConfig, productController.clearFields, productController.update, productController.productsIndexList);

// Rotas para apagar
route.get('/product/index/delete/:id', loginRequired, productController.delete, productController.productsIndexList);

// Rotas do login
// route.post('/register', loginController.register);
route.get('/admin/login', loginController.login);
route.get('/admin/logout', loginController.logout);
route.post('/admin/loggedin', loginRequired, loginController.loggedin);


module.exports = route;
