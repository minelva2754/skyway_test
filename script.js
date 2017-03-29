class HandleMultiParty {

    constructor() {
        this.multiparty = new MultiParty({
            "key": "01089c80-b5f7-4c69-bbac-dfe431e28b5e",
            "reliable": true,
            "room": 'test_room_2017-02-28_01-04-56',
            "debug": 3
        });
        this.handleError();
        this.handleMediaStream();
    }

    start() {
        this.multiparty.start();
    }

    handleError() {
        this.multiparty.on('error', err => alert(err));
    }

    handleMediaStream() {
        this._handleMediaStreamMyVideo();
        this._handleMediaStreamReceivedVideo();
        this._handleMediaStreamClose();
    }

    _handleMediaStreamMyVideo() {
        this.multiparty.on('my_ms', video => {
            const vNode = MultiParty.util.createVideoNode(video);
            vNode.setAttribute("class", "video my-video");
            vNode.volume = 0;
            $(vNode).appendTo("#streams");
        });
    }

    _handleMediaStreamReceivedVideo() {
        this.multiparty.on('peer_ms', video => {
            const vNode = MultiParty.util.createVideoNode(video);
            vNode.setAttribute("class", "video peer-video");
            $(vNode).appendTo("#streams");
        })
    }

    _handleMediaStreamClose() {
        this.multiparty.on('ms_close', peer_id => $("#" + peer_id).remove());
    }
}

(() => {
    const myMultiParty = new HandleMultiParty();
    myMultiParty.start();
})();

