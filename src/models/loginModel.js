const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')


const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const LoginModel = mongoose.model('users', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }


    async login() {
        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Usuário ou senha incorretos');
            return;
        }
         if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Usuário ou senha incorretos');
            this.user = null;
            return;
        }
    }

        async register() {
            const salt = bcryptjs.genSaltSync(); // Para criar um hash para as senhas
            this.body.password = bcryptjs.hashSync(this.body.password, salt);
    
            this.user = await LoginModel.create(this.body);
    
        }
    


        // async login() {
        //     this.valida();
        //     if (this.errors.length > 0) return;
        //     this.user = await LoginModel.findOne({ email: this.body.email });

        //     if (!this.user) {
        //         this.errors.push('Usuário não existe.');
        //         return;
        //     }

        //     if (this.user.password !== req.body.password) {
        //         this.errors.push('Usuário não existe.');
        //         return
        //     }
        // }

        // valida() {
        //     this.cleanUp();

        //     if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido'); // Importado Validator
        //     if (this.body.password.length < 3 || this.body.password.length > 50) {
        //         this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
        //     }
        // }

        // cleanUp() {
        //     for (let key in this.body) {
        //         if (typeof this.body[key] !== 'string') {
        //             this.body[key] = '';
        //         }
        //     }
        //     this.body = {
        //         email: this.body.email,
        //         password: this.body.password
        //     };
        // }

    }



module.exports = Login;