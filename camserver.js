let NodeWebcam = require( "node-webcam" );
let io = require('socket.io')(9090);

let opts = {
    callbackReturn: "base64"
};

io.sockets.on('connection', function (socket) {
    console.log()
    NodeWebcam.capture("test_picture", opts, function (err, data) {
        socket.emit("video", data);
    });
})
