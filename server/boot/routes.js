module.exports = function(app) {
    var router = app.loopback.Router();

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
                var accessToken = encodeURIComponent(token.id);


                // localStorage.setItem('accessToken', accessToken);

                res.redirect('/admin?access='+ accessToken);
            });
        });

    router.get('/admin', function (req, res) {

        res.render('home', {
            // username: req.token.utilisateur.username,
                accessToken: req.query.access
        });

        // console.log(window.localStorage.getItem('accessToken'));
    });

    router.get('/logout', function(req, res) {
        var AccessToken = app.models.AccessToken;
        var token = new AccessToken({id: req.query['access_token']});
        token.destroy();

        // localStorage.setItem('accessToken', null);

        res.redirect('/');
    });

    // //log a user out
    // app.get('/logout', function(req, res, next) {
    //     if (!req.accessToken) return res.sendStatus(401); //return 401:unauthorized if accessToken is not present
    //     User.logout(req.accessToken.id, function(err) {
    //         if (err) return next(err);
    //         res.redirect('/'); //on successful logout, redirect
    //     });
    // });

    app.use(router);

};