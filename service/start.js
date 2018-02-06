const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {db} = require('./secrets');

const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/*Connecting to database*/
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://'+db.username+':'+db.password+'@ds125368.mlab.com:25368/fuel');
const database = mongoose.connection;
database.once('open',function () {
    console.log('Connected to ' + db.databaseName + ' database');
});
database.on('error',function (err) {
    console.log(err);
});

require('./REST/router') (app);

const PORT = process.env.PORT || 3000;
app.listen(PORT,function () {
    console.log('Server started at port ' + PORT);
});
