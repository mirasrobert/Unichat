const express = require('express');
const http = require('http');
const db = require('./database/database');
const passport = require('passport');

const app = express();
const server = http.createServer(app);

// Load config env
require('dotenv').config();

// Database Connection
db.authenticate()
	.then(() => console.log('Database is Connected...'))
	.catch(err => console.error(err));

// Pass the global passport object into the configuration function
require('./middleware/passport-jwt')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Init Middleware - Body Parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

// Define API Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Init Socket.io
const io = require("socket.io")(server, {
	cors: {
	  origin: "*",
	  methods: ["GET", "POST"]
	}
  });


const users = {};

io.on('connection', socket => {

	// Logs when someone connects
	console.log('Conneted Socket IO' + socket.id)

	socket.on('newOnlineUser', username => {
		users[username] = socket.id;

		// Tell everyone that someone connects
		io.emit('userJoined', users);
	});

	// Logs when someone disconnected
	socket.on('disconnect', () => {
		console.log('Disconnected: '+ socket.id);
	});
});


 
// Start a server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server started on port ' + PORT));