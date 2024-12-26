const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib/callback_api')
const router = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

setTimeout(() => {
    amqp.connect('amqp://rabbitmq:5672', (err, connection) => {
        if (err) throw err;
        connection.createChannel((err, channel) => {
            if (err) throw err;
            let queue = 'hello';

            channel.assertQueue(queue, {
                durable: false
            });
            
            cb(connection, channel, queue);
        })
    })
}, 5000)

const cb = (connection, channel, queue) => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Publisher server up and running on port: ${PORT}`);

        app.post('/', (req, res, next) => {
            req.vars = {
                connection,
                channel,
                queue
            }
            next();
        })
        app.use('/', router);
    })
}