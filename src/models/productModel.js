const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: false },
    availability: { type: String, required: true },
    dimension: { type: Number, required: true },
    description: { type: String, required: true },
    img: { type: String },
    specialSection: { type: String, default: "off" },
    createdOn: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model('products', ProductSchema);

class Product {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.product = null;
    }

    async register() {
        this.validation();
        if (this.errors.length > 0) return;
        this.product = await ProductModel.create(this.body);
    }

    async edit(id) {
        this.product = await ProductModel.findByIdAndUpdate(id, this.body, { new: true });
        
    }

}

Product.prototype.validation = function() {
    if (!this.body.name) this.errors.push('Nome é um campo obrigatório');
    if (!this.body.price) this.errors.push('Preço é um campo obrigatório');
    if (!this.body.availability) this.errors.push('Disponibilidade é um campo obrigatório');
    if (!this.body.description) this.errors.push('Descrição é um campo obrigatório');
    if (!this.body.img && !this.file.filename) {
         this.errors.push('Imagem é um campo obrigatório');
    }
}

Product.getProducts = async () => {
    const products = await ProductModel.find()
        .sort({ createdOn: -1 });
    return products;
};

Product.getProductById = async (id) => {
    const singleProduct = await ProductModel.findById(id);
    return singleProduct;

};

Product.delete = async (id) => {
    const singleProduct = await ProductModel.findByIdAndDelete(id);
    return singleProduct;
}

module.exports = Product;

