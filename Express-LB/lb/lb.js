const express = require('express')
const request = require('request')

const serversConfig = [{
    url: 'http://app1:3000',
    weight: 1
}, {
    url: 'http://app2:4000',
    weight: 1
}]

let current = 0;   

// Round Robin
const roundRobinHandler = (req, res) => {
    const server = serversConfig[current];
    
    console.log(`Sending req ${req.method}: ${server['url']}`)
    req.pipe(request({ url: server['url']+req.url })).pipe(res);
    current = (current + 1) % serversConfig.length;
}

const lbserver = express();

lbserver.get('/favicon.ico', (req, res) => {
    return res.send('/favicon.ico')
})

lbserver.use((req, res) => { 
    console.log(`Received req ${req.method}: ${req.url}`)
    roundRobinHandler(req, res);
})

const PORT = process.env.PORT || 8000;
lbserver.listen(PORT, () => {
    console.log(`LB Server up and running on port ${PORT}`);
})