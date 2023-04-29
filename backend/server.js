const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        credentials: true
    }
});


app.get('/', function(req, res) {
    res.send('Hellow Chating App Server');
});

//connection event handler
io.on('connection' , function(socket) {
    console.log('Connect from Client: '+ socket)

    socket.on('chat', function(data){
        console.log('message from Client: '+data.message)

        var rtnMessage = {
            message: data.message
        };

        // 클라이언트에게 메시지를 전송한다
        socket.broadcast.emit('chat', rtnMessage);
    });


})

httpServer.listen(3001, function() {
    console.log('socket io server listening on port 3001')
});