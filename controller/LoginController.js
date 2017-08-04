class LoginController {

    constructor(user) {
        this.user = user;
    }

    getLoginAction(req, res){
        res.render('login', {
            loginFailed: false
        });
    }
}

module.exports = LoginController;