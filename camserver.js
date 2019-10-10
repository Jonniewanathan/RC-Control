let http = require('http')
let NodeWebcam = require( "node-webcam" );
let io = require('socket.io')(9090,{
    path: '/',
        serveClient: false,
        // below are engine.IO options
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
});

http.listen(9090);

let opts = {
    callbackReturn: "base64"
};

io.sockets.on('connection', function (socket) {
    console.log("Connection Established")
    NodeWebcam.capture("test_picture", opts, function (err, data) {
        socket.emit("video", data);
    });
})
