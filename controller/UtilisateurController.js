class UtilisateurController {

    constructor(user) {
        this.user = user;
    }

    getUtilisateurListAction(req, res){
        this.user.list(req, res);
    }

}

module.exports = UtilisateurController;