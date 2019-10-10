let http = require('http').createServer(handler); //require http server, and create server with function handler()
let fs = require('fs'); //require filesystem module
let io = require('socket.io')(http) //require socket.io module and pass the http object (server)
let NodeWebcam = require( "node-webcam" );

http.listen(9090); //listen to port 8080

function handler (req, res) { //create server
    fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
        res.write(data); //write data from index.html
        return res.end();
    });
}

let opts = {
    callbackReturn: "base64"
};

io.sockets.on('connection', function (socket) {
    console.log("Connection Established")
    NodeWebcam.capture("test_picture", opts, function (err, data) {
        socket.emit("video", data);
    });
})
