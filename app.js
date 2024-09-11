if(process.env.NODE_ENV!=="production"){
    require('dotenv').config();
}
const express = require("express");
const app= express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const methodOverride= require('method-override');
const ExpressError = require("./utils/ExpressError");
// const session = require('express-session');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const User = require('./models/user');

// const Campground = require('./models/campground');
// const catchAsync= require('./utils/catchAsync');

// const {campgroundSchema, reviewSchema}= require('./schemas.js');
// const Review = require("./models/review");

const userRoutes = require('./routes/users');
const campgroundsRoutes= require('./routes/campground.js');
const reviewsRoutes= require('./routes/reviews.js');
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelpCamp';
// const dbUrl = process.env.DB_URL;
// 'mongodb://127.0.0.1:27017/yelpCamp'
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"));
db.once('open',()=>{
    console.log("Database connected");
});

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.engine('ejs',ejsMate);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
app.use(mongoSanitize());

const secret = process.env.SECRET || 'bettersecret';
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
         secret: secret
    }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave:false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        // secure:true,
        expires: Date.now()+ 1000* 60*60*24*7,
        maxAge: 1000* 60*60*24*7
    }
} 

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({contentSecurityPolicy:false}));


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", 
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", 
];
const connectSrcUrls = [
    "https://api.maptiler.com/", 
];

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user; 
    console.log('Current User:', res.locals.currentUser);
    res.locals.success= req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/', userRoutes);
app.use('/campgrounds',campgroundsRoutes);
app.use('/campgrounds/:id/reviews',reviewsRoutes);

app.get('/',(req,res)=>{
    res.render("home");
})


app.get('*',(req,res,next)=>{
    next(new ExpressError('Page not Found',404));
})
app.use((err,req,res,next)=> {
    const { message="Bad Request",statusCode=500,} = err;
    res.status(statusCode).render('error',{err});
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Serving on port ${port}` );
})