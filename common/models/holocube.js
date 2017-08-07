'use strict';

module.exports = function(Holocube) {

    Holocube.list = function (req, res, user, playlist) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }

        Holocube.find({}, function (err, holocubes) {
            if(err) {}

            user.find({}, function (err, utilisateurs) {
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
    }
    
    
    Holocube.new = function (req, res, utilisateur, playlist) {
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
    }

    Holocube.creat =  function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }

        var nom = req.body.nom;
        var adresseIP = req.body.adresseIP;
        var mdp = req.body.password;
        var client = req.body.client;
        var playlist = req.body.playlist;

        Holocube.create({
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
    }

    Holocube.getEdit = function (req, res, utilisateur, playlist) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }
        var holocubeId = req.params.id;
        Holocube.findById(holocubeId, function (err, holocube) {
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
    }

    Holocube.postEdit = function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }

        var holocubeId = req.params.id;
        var nom = req.body.nom;
        var adresseIP = req.body.adresseIP;
        var mdp = req.body.password;
        var client = req.body.client;
        var playlist = req.body.playlist;

        Holocube.updateAll({id: holocubeId},{
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
    }

    Holocube.getDelete = function (req, res) {
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }
        // Penser à ajouter une fenêtre de confirmation avant (pop-up)
        var holocubeId = req.params.id;

        Holocube.destroyById(holocubeId, function (err, done) {
            if(err) {
                return res.render('back/hologramme/index', {
                    err: true,
                    empty: false
                });
            }
            res.redirect('/admin/holocube')
        })
    }

};
