// external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');



const app = express();
dotenv.config();

//database connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => console.log("database connection successful!"))
.catch((err)=> console.log(err));


//request parsers
app.use(express.json()); // for req body buffer to json convert
app.use(express.urlencoded({extended: true})); //for html template form handling & extended: true - so that, able to parse query parameters also


// set view engine
app.set('view engine', 'ejs'); // code in views folder

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET)); 
// for set cookie secret
// 1. go to search 'wordpress salt generator' and copy
// 2. then go to sha1 online, past the code and generate hash and copy the hash
// 3. use this hash as cookie secret

// routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);



// 404 not found error handling
app.use(notFoundHandler);

// common error handling
app.use(errorHandler)

app.listen(process.env.PORT, ()=> {
    console.log(`app listening to port ${process.env.PORT}`);
})