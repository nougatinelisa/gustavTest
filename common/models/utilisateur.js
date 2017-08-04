'use strict';

module.exports = function(Utilisateur) {

    Utilisateur.connect(req, res){

        var email = req.body.email;
        var password = req.body.password;

        app.models.utilisateur.login({
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
    }

};
