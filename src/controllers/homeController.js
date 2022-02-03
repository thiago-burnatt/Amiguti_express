const Product = require('../models/productModel');



exports.homePage = (req, res) => {
    res.render('index');
};

exports.productsIndex = async (req, res) => {
    const products = await Product.getProducts();
    res.render('products', {products});
};

exports.saleIndex = async (req, res) => {
    const products = await Product.getProducts();
    res.render('sale', {products});
};

exports.showDatails = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const product = await Product.getProductById(req.params.id);
    if (!product) return res.render('404');
    res.render('productDetails', { product });
};


