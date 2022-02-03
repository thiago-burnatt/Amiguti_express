const Product = require('../models/productModel');

exports.addProduct = (req, res) => {
    res.render('newProduct');
}

exports.register = async (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        salePrice: req.body.salePrice,
        availability: req.body.availability,
        dimension: req.body.dimension,
        description: req.body.description,
        img: req.file.filename,
        specialSection: req.body.specialSection,
    });

    try {
        await product.register();

        if (product.errors.length > 0) {
            req.flash('errors', product.errors);
            req.session.save(() => res.redirect('/product/index'));
            return;
        }

        req.flash('success', 'Produto cadastrato com sucesso');
        req.session.save(() => res.redirect('/product/index'));

    } catch (err) {
        req.flash('error', 'Verifique os campos e tente novamente');
        req.session.save(() => res.redirect('/product/index'));

    }

    next();
};

exports.productsIndexList = async (req, res) => {
    const products = await Product.getProducts();
    res.render('newProduct', { products });

};

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const product = await Product.getProductById(req.params.id);
    if (!product) return res.render('404');
    res.render('productEdit', { product });
};

exports.update = async (req, res, next) => {
    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        salePrice: req.body.salePrice,
        availability: req.body.availability,
        dimension: req.body.dimension,
        description: req.body.description,
        img: req.body.img,
        specialSection: req.body.specialSection,

    });

    await product.edit(req.params.id, product);
    req.flash('success', 'Produto editado com sucesso');
    res.redirect('/product/index');

    next();
}

exports.clearFields = async (req, res, next) => {
    let product = new Product({
        specialSection: '',
    });
    await product.edit(req.params.id, product);
    next();
}

exports.delete = async (req, res, next) => {
    const product = await Product.delete(req.params.id);
    req.flash('success', 'Produto excluído com sucesso');
    res.redirect('/product/index');
    next();
}