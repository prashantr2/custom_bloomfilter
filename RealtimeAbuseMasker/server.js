const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const { Server } = require('socket.io');
const { createServer } = require('http')
const { abuse_masker } = require('./abuse_masker.js');
require('dotenv').config();

const app = express();
app.set('views', 'public');
app.set('view engine', 'ejs');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.get('/home', (req, res) => {
    res.render(`home`, {});
})


const server = createServer(app);
const io = new Server(server);

// Globals
client_map = {};

// App Events
io.on('connection', (client) => {
    client_map[client.id] = client.handshake.query.loggeduser;
    console.log(chalk.green(`${client_map[client.id]} got connected`));
    io.emit('newuser', {
        msg: `${client_map[client.id]} just joined the chat`,
    })
    
    client.on('msg', (payload) => {
        console.log(`${chalk.blue(client_map[client.id])}: ${payload.msg}`);
        // Some masking logic to place here
        payload_to_send = { ...payload };
        payload_to_send.msg = abuse_masker(payload.msg);
        
        io.emit('msg', {
            username: client_map[client.id],
            msg: payload_to_send.msg
        });
    })
    
    client.on('disconnect', () => {
        console.log(chalk.red(`${client_map[client.id]} got disconnected`));
        client_map[client.id] = undefined;
    })
})



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server up and running on ${PORT}`);
})