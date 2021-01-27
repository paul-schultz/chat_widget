const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(bodyParser.json());
app.use(
        bodyParser.json(), 
        bodyParser.urlencoded({
            extended: false
        })
)

require('./route/dialogflowRoute')(app);
require('./route/fulfillmentRoute')(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log( `Running on port ${PORT}...` )
});