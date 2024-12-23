const Redis = require('redis');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

async function main() {
    const publisher = Redis.createClient({
        url: 'redis://redis-svc:6379'
    });

    publisher.on('error', (err) => {
        console.log('Redis Client Error: ', err);
    });

    await publisher.connect();

    const channel = 'my_channel';

    function publishMessage(message) {
        publisher.publish(channel, message);
        console.log(`Published message: ${message}`);
    }
    
    // Express App
    
    app.set('view engine', 'ejs');
    app.get('/', (req, res) => {
        res.render('ui.ejs')
    });
    app.post('/', (req, res) => {
        publishMessage(`Sending: ${req.body.msg}`);
        res.render('ui.ejs');
    })

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server up and runing on port: ${PORT}`);
    })
}

main().catch(console.error);