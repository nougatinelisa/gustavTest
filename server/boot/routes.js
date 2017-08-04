// All variables that will be used again
module.exports = function(app) {
    var router = app.loopback.Router();
    var holocube = app.models.holocube;
    var utilisateur = app.models.utilisateur;
    var playlist = app.models.playlist;

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    //index of the website
    router.get('/', function (req, res) {
        res.render('index');
    });

    // login page
    router.get('/login', function(req, res) {
        res.render('login', {
            loginFailed: false
        });
    });

    // page where you send the data and connect the user
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

    // homepage of the back office
    router.get('/admin', function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }
        res.render('back/home', {
                accessToken: localStorage.getItem('accessToken')
        });
    });

//\\//\\    HOLOCUBE    //\\//\\

    //index page
    router.get('/admin/holocube', function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }

        holocube.find({}, function (err, holocubes) {
            if(err) {}

            utilisateur.find({}, function (err, utilisateurs) {
                if (err) {
                }

                playlist.find({}, function (err, playlists) {
                    if (err) {
                    }

                    res.render('back/hologramme/index', {
                        holocubes: holocubes,
                        utilisateurs: utilisateurs,
                        playlists: playlists,
                        empty: false,
                        err: false
                    })
                });
            });
        });
    });

    // new holocube
    router.get('/admin/holocube/new', function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }

        utilisateur.find({}, function (err, utilisateurs) {
            if(err) {}

            playlist.find({}, function (err, playlists) {
                if(err) {}

                return res.render('back/hologramme/new', {
                    err: false,
                    utilisateurs: utilisateurs,
                    playlists: playlists
                });
            });
        });
    });

    // new holocube when you send the POST data
    router.post('/admin/holocube/new', function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }

        var nom = req.body.nom;
        var adresseIP = req.body.adresseIP;
        var mdp = req.body.password;
        var client = req.body.client;
        var playlist = req.body.playlist;

        holocube.create({
            nomHolocube: nom,
            adresseIP: adresseIP,
            mdp: mdp,
            utilisateurId: client,
            playlistId: playlist
        }, function (err, holocube) {
            if(err) {
                return res.render('back/hologramme/new', {
                    nom: nom,
                    adresseIP: adresseIP,
                    mdp: mdp,
                    client: client,
                    playlist: playlist,
                    err: true
                });
            }
            res.redirect('/admin/holocube')
            // Penser à ajouter un message de réussite qui disparait ensuite
        })
    });

    // edit holocube
    router.get('/admin/holocube/:id/edit', function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }
        var holocubeId = req.params.id;
        holocube.findById(holocubeId, function (err, holocube) {
            if(err) throw err;

            utilisateur.find({}, function (err, utilisateurs) {
                if(err) {}

                playlist.find({}, function (err, playlists) {
                    if(err) {}

                    return res.render('back/hologramme/edit', {
                        err: false,
                        holocube: holocube,
                        utilisateurs: utilisateurs,
                        playlists: playlists
                    });
                });
            });
        });
    });

    //edit holocube when you send the POST data
    router.post('/admin/holocube/:id/edit', function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }

        var holocubeId = req.params.id;
        var nom = req.body.nom;
        var adresseIP = req.body.adresseIP;
        var mdp = req.body.password;
        var client = req.body.client;
        var playlist = req.body.playlist;

        holocube.updateAll({id: holocubeId},{
            nomHolocube: nom,
            adresseIP: adresseIP,
            mdp: mdp,
            utilisateurId: client,
            playlistId: playlist
        }, function (err, holocube) {
            if(err) {
                return res.render('back/hologramme/edit', {
                    nom: nom,
                    adresseIP: adresseIP,
                    mdp: mdp,
                    client: client,
                    playlist: playlist,
                    err: true
                });
            }
            res.redirect('/admin/holocube')
        })
    });
    
    router.get('/admin/holocube/:id/delete', function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }
        // Penser à ajouter une fenêtre de confirmation avant (pop-up)
        var holocubeId = req.params.id;

        holocube.destroyById(holocubeId, function (err, done) {
            if(err) {
                return res.render('back/hologramme/index', {
                    err: true,
                    empty: false
                });
            }
            res.redirect('/admin/holocube')
        })
    });



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