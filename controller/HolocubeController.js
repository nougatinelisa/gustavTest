class HolocubeController {

    constructor(holocube, user, playlist) {
        this.holocube = holocube;
        this.user = user;
        this.playlist = playlist;

    }

    getHolocubeListAction(req, res){
        this.holocube.list(req, res, this.user, this.playlist);
    }

    getHolocubeNewAction(req, res){
        this.holocube.new(req, res, this.user, this.playlist);
    }

    postHolocubeCreateAction(req, res){
        this.holocube.creat(req, res);
    }

    getHolocubeEdit(req, res){
        this.holocube.getEdit(req, res, this.user, this.playlist);
    }

    postHolocubeEdit(req, res){
        this.holocube.postEdit(req, res);
    }

    getHolocubeDelete(req, res){
        this.holocube.getDelete(req, res);
    }
}

module.exports = HolocubeController;