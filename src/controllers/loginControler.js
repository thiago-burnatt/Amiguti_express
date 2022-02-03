const Login = require('../models/loginModel');

exports.login = (req, res) => {
    if (req.session.user) return res.redirect('/product/index');
    return res.render('login');
}

exports.loggedin = async (req, res) => {
    const login = new Login(req.body);
    try {
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/admin/login');
            });
            return;
        }
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/product/index');
        })

    } catch (error) {
        console.log(error);
        return res.render('404');
    }

}


exports.register = async (req, res) => {
    try {
        const user = new Login(req.body);
        await user.register();
        return res.json(user);
    } catch (error) {
        res.send(error);
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}