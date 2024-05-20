const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require("passport");
var bodyParser = require("body-parser")

require('./models/User');
require('./models/Student');
require('./services/passportConfiguration');


const app = express();
mongoose.set('strictQuery', true);
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true }) .then(() => console.log("MongoDB connected")) .catch((err) => console.log(err));

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());
require('./routes/studentRoutes')(app);
require('./routes/jwtAuthRoutes')(app);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}



const PORT = process.env.PORT || 5000
app.listen(PORT);

