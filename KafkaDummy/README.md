## Kafka Dummy Setup
- A Kafka Dummy setup to kickstart learning Kafka

#### How to run?
- Start zookeeper and docker containers with `docker compose up --build` 
- To create some topic in kafka: `node admin.js` (You'll need this to create msgs from producer)
- To create a consumer in kafka: `node consumer.js` (keep it running)
    - If you create another consumer with above command, zookeeper will balance the consumer group so that each consumer gets one partition only
- Create some msgs using `node producer.js <text_msg>`
- Observe how the consumers get the msgs (both consumers will consumer from only the partition designated to them only if using 2 consumers)
- Try with more than 2 consumers

> Thanks! Hope you liked it!