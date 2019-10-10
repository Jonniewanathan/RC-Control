let NodeWebcam = require( "node-webcam" );
let io = require('socket.io')(8080);

let opts = {
    callbackReturn: "base64"
};
NodeWebcam.capture("test_picture", opts, function (err, data) {
    io.emit("video", data);
});