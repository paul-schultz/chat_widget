const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

require('./route/dialogflowRoute')(app);

const PORT = 5000;
app.listen(PORT, () => {
    console.log( `Running on port ${PORT}...` )
});