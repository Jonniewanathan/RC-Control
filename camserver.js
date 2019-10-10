let NodeWebcam = require( "node-webcam" );
let io = require('socket.io')(http);
io.sockets.on('connection', function (socket) {
    let opts = {
        callbackReturn: "base64"
    };
    NodeWebcam.capture("test_picture", opts, function (err, data) {
        socket.emit("video", data);
    });
});