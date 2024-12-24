const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

    
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    console.log(`Landed on home`);
    res.render('ui.ejs')
});

app.post('/', (req, res) => {
    console.log(`Sending: ${req.body.msg}`);
    res.render('ui.ejs');
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server up and runing on port: ${PORT}`);
})