export default class ProductEdit {
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
        const inputName = el.querySelector('input[name="name"]');
        const inputPrice = el.querySelector('input[name="price"]');
        const inputAvailability = el.querySelector('input[name="availability"]');
        const inputDimension = el.querySelector('input[name="dimension"]');
        const inputDescription = el.querySelector('input[name="description"]');
        let error = false;

        if (!inputName.value) {
            alert('Nome é um campo obrigatório');
            error = true;
        }
        if (!inputPrice.value) {
            alert('Preço é um campo obrigatório');
            error = true;
        }
        if (!inputAvailability.value) {
            alert('Disponibilidade é um campo obrigatório');
            error = true;
        }
        if (!inputDimension.value) {
            alert('Altura é um campo obrigatório');
            error = true;
        }       

        if (!error) el.submit();
    }
}
