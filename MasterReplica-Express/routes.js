const router = require('express').Router();
const { primaryClient, replicatorClient } = require('./db')

let queries_results = ""

router.get('/', (req, res) => {
    res.render('home.ejs', { alert: '', data: queries_results })
});

router.post('/', async (req, res) => {
    if (/ ?drop */.test(req.body.msg.toLowerCase())) {
        return res.render('home.ejs', { alert: "Please don't execute DROP/ALTER queries!", data: queries_results });
    }
    if (/ ?alter */.test(req.body.msg.toLowerCase())) {
        return res.render('home.ejs', { alert: "Please don't execute DROP/ALTER queries!", data: queries_results });
    }
    console.log(`Firing query: ${req.body.executeOn}: ${req.body.msg}`);
    
    header_string = '===================PRIMARY========================'
    if (req.body.executeOn != 'primary') {
        header_string = '====================REPLICA======================='
    }
    try {
        if (req.body.executeOn == 'primary') {
            const data = await primaryClient.query(req.body.msg);
            queries_results = `
            ${header_string} 
            ${data.fields.map(f => f.name)}
            ${data.rows.map(r => Object.keys(r).map(k => r[k]) + '\n')}
            ` + queries_results
        } else {
            const data = await replicatorClient.query(req.body.msg);
            queries_results = `
            ${header_string} 
            ${data.fields.map(f => f.name)}
            ${data.rows.map(r => Object.keys(r).map(k => r[k]) + '\n')}
            ` + queries_results
        }
    } catch (err) {
        if (err) {
            console.log(`psqlServiceError: ${err.toString()}`);
            queries_results = `${header_string}
                psqlServiceError: ${err.toString()}` + queries_results;
        }
    }


    res.render('home.ejs', { alert: '', data: queries_results });
})

module.exports = router;