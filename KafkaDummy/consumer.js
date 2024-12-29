const { Kafka } = require('kafkajs')

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "my-app",
            "brokers": ["pacifire-pc:9092"]            
        })
        const consumer = kafka.consumer({ groupId: "test" });
        console.log("Consumer Connecting...")
        await consumer.connect();
        console.log('Consumer Connected!')  
        
        consumer.subscribe({
            topics: ["users"],
            fromBeginning: true
        })
        
        await consumer.run({
            "eachMessage": async result => {
                console.log(` [x] Recieved Msg: ${result.message.value} on partition ${result.partition}`)
            }
        })
    } catch (err) {
        console.log("Some error: ", err);
    }
}

run();