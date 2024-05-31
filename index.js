import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import './models/User.js';
import './models/Student.js';
import './services/passportConfiguration.js';
import studentRoutes from './routes/studentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import keys from './config/keys.js';


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
app.use(cors());
studentRoutes(app);
authRoutes(app);


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is Running on ${PORT}`);
});

