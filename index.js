var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    // res.send('<h1>Hello world</h1>');
});

var people = [];
app.get('/join/:name', function(req, res) {
  people.push(req.params.name);
  console.log(people);
  res.sendStatus(200).end();

});



io.on('connect',function(){
  io.emit('chat message','hi ! xxx Welcome to chat room!', {
      for: 'everyone'
  });
});

io.on('connection', function(socket) {
    io.on('join',function () {

    });

    socket.on('chat message', function(msg) {
        io.emit('chat message',people[0]+' : '+msg);
    });
});


http.listen(3000, function() {
    console.log('Magic happend on *:3000');
});
