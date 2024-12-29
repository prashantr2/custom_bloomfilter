const { Kafka } = require('kafkajs')

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "my-app",
            "brokers": ["pacifire-pc:9092"]
        })
        const admin = kafka.admin();
        console.log("Admin Connecting...")
        await admin.connect();
        console.log('Admin Connected!')  
        
        // A-M, N-Z
        await admin.createTopics({
            "topics": [
                {
                    "topic": "users",
                    "numPartitions": 2
                }
            ]
        })
        console.log("Created Successfully!") 
        
        admin.disconnect();
    } catch (err) {
        console.log("Some error: ", err);
    }
}

run();