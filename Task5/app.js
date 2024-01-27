const express=require('express');
const authRoutes = require('./routes/auth-routes'); 
const profileRoutes = require('./routes/profile-routes'); 
const passportSetup=require('./config/passport-setup');
const mongoose = require('mongoose');
const keys=require('./config/keys');
const expressSession=require('express-session');
const cookieSession=require('cookie-session');
const passport=require('passport');
const app=express();

app.set("view engine","ejs");

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});


app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
})