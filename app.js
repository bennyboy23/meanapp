const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const app = express();
const config = require('./config/database')


mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});
mongoose.connection.on('error', (err)=> {
    console.log('error ' + err);
})

//port number
const port = 3000;

//CORS middleware
app.use(cors());

//set static folder 

app.use(express.static(path.join(__dirname, 'public')));

//body parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

//Index route
app.get('/', (req,res) =>{
    res.send('hello');
});

//Start Server
app.listen(port, ()=> {
    console.log('server started no port' +port);
});