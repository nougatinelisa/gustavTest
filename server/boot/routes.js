// All variables that will be used again
module.exports = function(app) {
    const LoginCtrl = require('../../controller/LoginController');
    const HolocubeCtrl = require('../../controller/HolocubeController');
    const UtilisateurCtrl = require('../../controller/UtilisateurController');

    var router = app.loopback.Router();
    var holocube = app.models.holocube;
    var utilisateur = app.models.utilisateur;
    var playlist = app.models.playlist;
    const loginController = new LoginCtrl(utilisateur);
    const holocubeController = new HolocubeCtrl(holocube, utilisateur, playlist);
    const utilisateurController = new UtilisateurCtrl(utilisateur);

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    //index of the website
    router.get('/', function (req, res) {
        res.render('index');
    });

    // login page
    router.get('/login', loginController.getLoginAction)
    // page where you send the data and connect the user
    .post('/adminLogin', loginController.postLoginAction.bind(loginController));

    // homepage of the back office
    router.get('/admin', loginController.getAdminAction);

//\\//\\    HOLOCUBE    //\\//\\

    //index page
    router.get('/admin/holocube', holocubeController.getHolocubeListAction.bind(holocubeController));

    // new holocube
    router.get('/admin/holocube/new', holocubeController.getHolocubeNewAction.bind(holocubeController))
    // new holocube when you send the POST data
    .post('/admin/holocube/new', holocubeController.postHolocubeCreateAction.bind(holocubeController));

    // edit holocube
    router.get('/admin/holocube/:id/edit', holocubeController.getHolocubeEdit.bind(holocubeController))
    //edit holocube when you send the POST data
    .post('/admin/holocube/:id/edit', holocubeController.postHolocubeEdit.bind(holocubeController));

    
    router.get('/admin/holocube/:id/delete', holocubeController.getHolocubeDelete.bind(holocubeController));

    //log a user out
    router.get('/logout', loginController.getLogoutAction.bind(loginController));

    router.get('/admin/utilisateur', utilisateurController.getUtilisateurListAction.bind(utilisateurController));

    app.use(router);
};