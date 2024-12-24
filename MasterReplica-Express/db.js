const { Client } = require('pg');

const primaryClient = new Client('postgres://user:password@postgres_primary:5432/mydb')
setTimeout(() => {
  primaryClient.connect(err => {
    if (err) console.log('Error:', err)  
    else {
      console.log('Connected to PostgresQL Primary')
    }
  })
}, 5000);

const replicatorClient = new Client('postgres://replicator:replicator_password@postgres_replica:5432/mydb')
setTimeout(() => {
  replicatorClient.connect(err => {
    if (err) console.log('Error:', err)  
    else {
      console.log('Connected to PostgresQL Replica')
    }
  });
}, 5000);


module.exports = {
    primaryClient,
    replicatorClient,
}