const { Kafka } = require('kafkajs')
const msg = process.argv[2];

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "my-app",
            "brokers": ["pacifire-pc:9092"]            
        })
        const producer = kafka.producer();
        console.log("Producer Connecting...")
        await producer.connect();
        console.log('Producer Connected!')  
        
        const partition = msg[0] < "N" ? 0: 1;
        const result = await producer.send({
            "topic": "users",
            "messages": [
                { 
                    value: msg,
                    partition: partition
                }
            ]
        })
        console.log(`Msg published successfully: ${JSON.stringify(result)}`)  
        
        producer.disconnect();
    } catch (err) {
        console.log("Some error: ", err);
    } finally {
        process.exit(0);
    }
}

run();