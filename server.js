// Set up an express application to run the server
let express = require("express");
let app = express();

// tell our express application to serve the 'public' folder files
app.use(express.static("public"));

// tell the server to listen on a given port (8080)
let server = app.listen(8080);

console.log("Webserver is running !");

// We will use the socket.io library to manage Websocket connections
let io = require("socket.io")().listen(server);

// Set up each socket connection
io.on("connection", onSocket);

function onSocket(socket) {
  console.log(
    "Socket connected!  There are " +
      io.engine.clientsCount +
      " current connections."
  );

  // whenever we get a 'chat' message, forward it to all connected sockets
  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  socket.on("paint", function (data) {
    io.sockets.emit("paint", data);
  });
  socket.on("stamp", function (data) {
    io.sockets.emit("stamp", data);
  });

  socket.on("moveStar", function (data) {
    io.sockets.emit("moveStar", data);
  });

}
