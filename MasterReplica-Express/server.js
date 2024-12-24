const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/', router);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})