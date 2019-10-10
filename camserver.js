let NodeWebcam = require( "node-webcam" );
let io = require('socket.io');
let http = require('http')
let server = http.createServer();
server.listen(9090, "http://localhost/");
let socket = io.listen(server);

let opts = {
    callbackReturn: "base64"
};

io.sockets.on('connection', function (socket) {
    console.log("Connection Established")
    NodeWebcam.capture("test_picture", opts, function (err, data) {
        socket.emit("video", data);
    });
})
