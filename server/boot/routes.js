module.exports = function(app) {
    var router = app.loopback.Router();

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    router.get('/', function (req, res) {
        res.render('index');
    });

    router.get('/login', function(req, res) {
        res.render('login', {
            loginFailed: false
        });
    });

    router.post('/adminLogin', function(req, res) {
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
        });

    router.get('/admin', function (req, res) {

        res.render('home', {
                accessToken: localStorage.getItem('accessToken')
        });
    });

    // router.get('/logout', function(req, res) {
    //     var AccessToken = app.models.AccessToken;
    //     var token = new AccessToken({id: localStorage.getItem('accessToken')});
    //     token.destroy();
    //
    //     localStorage.removeItem('accessToken');
    //
    //     res.redirect('/');
    // });

    //log a user out
    router.get('/logout', function(req, res, next) {
        if (!localStorage.getItem('accessToken')) return res.sendStatus(401); //return 401:unauthorized if accessToken is not present
        app.models.utilisateur.logout(localStorage.getItem('accessToken'), function(err) {
            if (err) return next(err);

            localStorage.removeItem('accessToken');

            res.redirect('/'); //on successful logout, redirect
        });
    });

    app.use(router);

};