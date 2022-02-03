export default class Product {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const inputFile = el.querySelector('input[name="picture"]');
        const inputSalePrice = el.querySelector('input[name="salePrice"]');
        const saleFlag = el.querySelector('input[name="sale"');
        const inputFileSplit = inputFile.value.split('.');
        const extension = inputFileSplit[1];
        let error = false;

        if (!inputFile.value) {
            alert('Por favor, adicione uma foto');
            error = true;
        };

        if (extension !== 'jpeg' && extension !== 'png' && extension !== 'jpg') {
            alert('A extensão do arquivo incorreta');
            error = true;
        }

        if (!error) el.submit();
    }
}

// const product = new Product('.form-product');

// product.init();