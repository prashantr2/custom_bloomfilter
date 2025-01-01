const express = require('express');

const app = express();

const handler = (serverName) => (req, res) => {
    console.log(`Request from ${serverName}`, req.method, req.url);
    res.send(`Hello from server ${serverName}`);
}

app.get('*', handler('srv2')).post('*', handler('srv2'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})