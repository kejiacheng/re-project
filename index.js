var express = require('express');
var router = express.Router();
var app = express();
var http = require('http').Server(app);
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var config = require('config-lite');
var routes = require('./routes');
var io = require('socket.io').listen(http);


var path = require('path');

app.set('views','./views');

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'./src/web')));
app.use(express.static(path.join(__dirname,'./src')));

app.use(session({
	resave: false,
	saveUninitialized: true,
	name: config.session.key,
	secret: config.session.secret,
	cookie: {
		maxAge: config.session.maxAge
	},
	store: new MongoStore({
		url: config.mongodb
	})
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var name = [];

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('pay', function (data) {
        socket.broadcast.emit('payEvent', {success: true})
    })
	socket.on('unUseful', function (data) {
		socket.broadcast.emit('payEvent', {success: false})
	})
});

http.listen(3000,function(){
	console.log(3000);
});