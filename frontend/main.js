import 'core-js';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import Product from './modules/Products';
import ProductEdit from './modules/ProductEdit';

const product = new Product('.form-product');
const productEdit = new ProductEdit('.form-product-edit')

product.init();
productEdit.init();
