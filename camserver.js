let NodeWebcam = require( "node-webcam" );
let io = require('socket.io')(9090);

let opts = {
    callbackReturn: "base64"
};
io.on('connection', function (socket) {
    NodeWebcam.capture("test_picture", opts, function (err, data) {
        io.broadcast.emit("video", data);
    });
})
