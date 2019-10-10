let http = require('http').createServer(handler); //require http server, and create server with function handler()
let fs = require('fs'); //require filesystem module
let io = require('socket.io')(http) //require socket.io module and pass the http object (server)
let Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
let left = new Gpio(23, 'out'); //use GPIO pin 4 as output
let right = new Gpio(27, 'out'); //use GPIO pin 4 as output
// let forward = new Gpio(17, 'out'); //use GPIO pin 4 as output
// let reverse = new Gpio(22, 'out'); //use GPIO pin 4 as output

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
    let initialvalueleft = 1; //static variable for current status
    let initialvalueright = 1;
    socket.on('left', function(data) { //get light switch status from client
        initialvalueleft = data;
        if (initialvalueleft != left.readSync()) { //only change LED if status has changed
            left.writeSync(initialvalueleft); //turn LED on or off
        }
    });
    socket.on('right', function(data) { //get light switch status from client
        initialvalueright = data;
        if (initialvalueright != right.readSync()) { //only change LED if status has changed
            right.writeSync(initialvalueright); //turn LED on or off
        }
    });
});