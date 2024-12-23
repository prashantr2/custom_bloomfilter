const Redis = require('redis');

async function main() {
    const subscriber = Redis.createClient({
        url: 'redis://redis-svc:6379'
    });

    subscriber.on('error', (err) => {
        console.log('Redis Client Error: ', err);
    });

    await subscriber.connect();
    const channel = 'my_channel';

    subscriber.subscribe(channel, (message) => {
        console.log(`Received on ${channel}: ${message}`);
    });
}

main().catch(console.error);