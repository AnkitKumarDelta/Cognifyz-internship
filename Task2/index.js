const { urlencoded } = require('body-parser');
const express=require('express');
const app=express();
app.listen(3000);
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/submit',(req,res)=>{
res.render('form');
});

app.post('/submit-form',(req,res)=>{
    let {username,email,password}=req.body;
    const errors=[];
    if(!username || username.trim===''){
        error.push('username is required');
    }
    if (!email || !isValidEmail(email)) {
        errors.push('Invalid email address');
    }
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    if(errors.length>0)
  return res.render('error', {errors}); 

  res.send("form succesfully submitted");
});

function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
