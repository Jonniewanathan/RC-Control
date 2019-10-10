let http = require('http').createServer(handler); //require http server, and create server with function handler()
let fs = require('fs'); //require filesystem module
let io = require('socket.io')(http) //require socket.io module and pass the http object (server)
let Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
let NodeWebcam = require( "node-webcam" );
let left = new Gpio(23, 'out');
let right = new Gpio(27, 'out');
let forward = new Gpio(17, 'out');
let reverse = new Gpio(22, 'out');

http.listen(8080); //listen to port 8080

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

io.sockets.on('connection', function (socket) {// WebSocket Connection
    let opts = {
        callbackReturn: "base64"
    };
    NodeWebcam.capture("test_picture", opts, function(err, data) {
        socket.emit("video", data);
    });
    let initialvalueleft = 1; //static variable for current status
    let initialvalueright = 1;
    let initialvalueforward = 1;
    let initialvaluereverse = 1;
    socket.on('movement', function(data) {
        console.log(data)
        initialvalueleft = data.left;
        initialvalueright = data.right;
        initialvalueforward = data.forward;
        initialvaluereverse = data.reverse;

        if (initialvalueleft != left.readSync()) {
            left.writeSync(initialvalueleft);
        }
        if (initialvalueright != right.readSync()) {
            right.writeSync(initialvalueright);
        }
        if (initialvalueforward != forward.readSync()) {
            forward.writeSync(initialvalueforward);
        }
        if (initialvaluereverse != reverse.readSync()) {
            reverse.writeSync(initialvaluereverse);
        }
    });
});


//Default options
// let opts = {
//     //Picture related
//     width: 1280,
//     height: 720,
//     quality: 100,
//     //Delay in seconds to take shot
//     //if the platform supports miliseconds
//     //use a float (0.1)
//     //Currently only on windows
//     delay: 0,
//     //Save shots in memory
//     saveShots: false,
//     // [jpeg, png] support varies
//     // Webcam.OutputTypes
//     output: "jpeg",
//     //Which camera to use
//     //Use Webcam.list() for results
//     //false for default device
//     device: false,
//     // [location, buffer, base64]
//     // Webcam.CallbackReturnTypes
//     callbackReturn: "location",
//     //Logging
//     verbose: false
// };
// //Also available for quick use
// NodeWebcam.capture("test_picture", opts, function(err, data) {
// });
//Return type with base 64 image
