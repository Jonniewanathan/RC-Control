let http = require('http')
let NodeWebcam = require( "node-webcam" );
let io = require('socket.io')(http);

let server = http.createServer();

server.listen(8080, "127.0.0.1");

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
