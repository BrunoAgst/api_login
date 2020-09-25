require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes');
const mongoDB = require('./service/connection');

mongoDB();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use("/v1/", router);


app.listen(3000, () => {
    console.log('server run');
});