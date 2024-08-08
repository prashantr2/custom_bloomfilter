const app = require('express')();
const morgan = require('morgan');
require('dotenv').config();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/api/', require('./apiRouter.js'))




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server up and running on ${PORT}`);
})