const express = require('express')
const bodyParser = require('body-parser');
const amqp = require('amqplib/callback_api')

const app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));

const msgs_data = []

setTimeout(() => {
    amqp.connect('amqp://rabbitmq:5672', (err, connection) => {
        if (err) throw err;
        
        connection.createChannel((err, channel) => {
            if (err) throw err;
            
            let queue = 'hello';
            channel.assertQueue(queue, {
                durable: false
            })
            
            console.log(' [*] Waiting for message in %s. To exit press Ctrl-C', queue)
            channel.consume(queue, (msg) => {
                console.log(" [x] Received %s", msg.content.toString());
                msgs_data.push(` [x] ${msg.content.toString()}`)
            }, {
                noAck: true
            })
        })
    })
}, 5000)

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.render('ui.ejs', { msgs_data });
})

app.get('/api', (req, res) => {
    res.json({ msgs_data });
})

app.listen(PORT, () => {
    console.log(`Consumer server up and running on port: ${PORT}`);
})