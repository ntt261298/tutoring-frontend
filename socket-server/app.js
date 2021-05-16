const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
  }
});

const events = [
  "User muted", 
  "User unmuted", 
  "User turned off camera", 
  "User turned on camera",
  "Expert muted", 
  "Expert unmuted", 
  "Expert turned off camera", 
  "Expert turned on camera",
]

io.on('connection', socket => {
  const id = socket.handshake.query.id;
  socket.join(id);

  events.forEach(event => {
    socket.on(event, () => {
      io.to(id).emit(event);
    });
  }) 

  socket.on('connect', () => {
    console.log('connect event')
    io.to(id).emit('Connect room');
  });
  
  socket.on('disconnect', () => {
    console.log('disconnect event')
    io.to(id).emit('Disconnect room');
  });
})

httpServer.listen(5000, () => console.log('Socket IO server is running'));
