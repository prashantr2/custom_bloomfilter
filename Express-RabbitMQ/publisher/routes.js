const router = require('express').Router();

const sendMsgToQueue = (channel, queue, msg) => {
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg)
}

router.get('/', (req, res) => {
    res.render('home.ejs')
});

router.post('/', async (req, res) => {
    const { connection, channel, queue } = req.vars
    
    sendMsgToQueue(channel, queue, req.body.msg);
    res.render('home.ejs');
})

module.exports = router;