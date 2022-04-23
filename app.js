require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const morgan = require('morgan');
const app = express();
var db = process.env.MONGO_URL
var port = process.env.PORT || 4001;
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const student= require('./server/routes/student');
const mongoose = require('mongoose');
const connectDB = require('./server/database/connection')

connectDB();
var cons = require('consolidate');
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/img', express.static(path.resolve(__dirname, 'public/img')))
app.use('/css', express.static(path.resolve(__dirname, 'public/css')))

app.use('/',student);

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});