class LoginController {

    constructor(user) {
        this.user = user;
    }

    getAdminAction(req, res){
        if (!localStorage.getItem('accessToken')) {
            return res.sendStatus(401);
        }
        res.render('back/home', {
            accessToken: localStorage.getItem('accessToken')
        });
    }

    getLoginAction(req, res){
        res.render('login', {
            loginFailed: false
        });
    }

    postLoginAction(req, res){
        this.user.connect(req, res);
    }

    getLogoutAction(req, res){
        this.user.getDisconnect(req, res);
    }
}

module.exports = LoginController;