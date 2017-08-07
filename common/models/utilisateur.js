'use strict';

module.exports = function(Utilisateur) {

    Utilisateur.connect = function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        Utilisateur.login({
            email: email,
            password: password
        }, 'utilisateur', function (err, token) {
            if (err) {
                return res.render('login', {
                    email: email,
                    password: password,
                    loginFailed: true
                });
            }

            token = token.toJSON();
            var accessToken = token.id;

            localStorage.setItem('accessToken', accessToken);

            res.redirect('/admin');
        });
    };

    Utilisateur.getDisconnect = function (req, res, next) {
        if (!localStorage.getItem('accessToken')) return res.sendStatus(401); //return 401:unauthorized if accessToken is not present
        Utilisateur.logout(localStorage.getItem('accessToken'), function(err) {
            if (err) return next(err);

            localStorage.removeItem('accessToken');

            res.redirect('/'); //on successful logout, redirect
        });
    }

    Utilisateur.list = function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }

        Utilisateur.find({}, function (err, utilisateurs) {
            if(err) {}

            res.render('back/utilisateur/index', {
                utilisateurs: utilisateurs,
                empty: false,
                err: false
            })
        });
    };

};
