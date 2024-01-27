const router=require('express').Router();

const authCheck=(req,res,next)=>{
    if(!req.user){
        //if user is not loggedin
        res.redirect('/auth/login');
    }
    else{
        next();
    }
}
router.get('/',authCheck,(req,res)=>{
// To this line
res.render('profile',{user:req.user});
});
module.exports=router;