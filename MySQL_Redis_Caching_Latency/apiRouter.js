const router = require('express').Router();
const redis = require('redis');
const mysql = require('mysql');
const axios = require('axios');
require('dotenv').config();

var redisClient = redis.createClient();
var mysqlClient = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'dbpass',
    database: 'mydb'
});
mysqlClient.connect();
console.log('Connected to MySQL')

const url = process.env.API_ENDPOINT;

(async() => {
    await redisClient.connect();
    console.log('Connected to Redis')
})()


router.get('/redis', async (req, res) => {
    let time1 = Date.now();
    let value = await redisClient.get('apiResponse');
    if (!value) {
        value = await axios.get(url);
        value = value.data[0];
        await redisClient.set('apiResponse', JSON.stringify(value));
    }
    console.log(`Total time taken: ${(Date.now() - time1)/1000}s`)
    res.send(value);
})

router.get('/mysql', async (req, res) => {
    let time1 = Date.now();
    let [value, resp] = await new Promise((resolve, reject) => {
        mysqlClient.query(`SELECT somevalue FROM keyValue WHERE somekey='apiResponse';`, async (err, result) => {
            if (err) reject([err, 0]);
            if (result.length == 0) {
               let data = await axios.get(url);
               data =  JSON.stringify(data.data[0]);
               resolve([data, 1]);
            } else resolve([result[0]["somevalue"], 2]);
        })
    })
    if (resp == 1) {
        await new Promise((resolve, reject) => {
           mysqlClient.query(`INSERT INTO keyValue VALUES ('apiResponse', '${value}');`, async (err, result) => {
                if (err) reject(err);
                resolve(result);
           })
        })
    }
    console.log(`Total time taken: ${(Date.now() - time1)/1000}s`)
    res.send(value);
})

module.exports = router