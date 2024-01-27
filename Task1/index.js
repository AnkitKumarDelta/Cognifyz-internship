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
    let {username}=req.body;
   res.send(`${username} are registered`); 
});