//requires
const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const mongoose = require('mongoose')
const formidableMiddleware = require('express-formidable');

const PORT = process.env.PORT
const app = express();

app.use(formidableMiddleware({ uploadDir: '/leagues/'}));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:81']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    next();
})

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to ' + db.host)
})


//Routes
const home = require('./api/routes/home')

app.use('/', home)

app.listen(PORT, ()=> {
    console.log('we live at http://127.0.0.1:'+PORT);
})