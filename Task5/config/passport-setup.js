const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys');
const userModel=require('../models/users');

passport.serializeUser((user,done)=>{
   done(null,user.id);
});

passport.deserializeUser(async  (id,done)=>{
  let User=await userModel.findById(id);
    done(null,User);
 });

 
passport.use(new GoogleStrategy({
    //options for strategy
    callbackURL:'/auth/google/redirect',
    clientID:keys.google.clientID,
clientSecret:keys.google.clientSecret
},async (accessToken,refreshToken,profile,done) => {
   //check if user alreasy exist
  let user= await userModel.findOne({googleId:profile.id});
   if(user){
console.log('user is ',user);
done(null,user);
   }
   else{
    //passport callback function
let createuser =  await new userModel({
    username:profile.displayName,
    googleId:profile.id,
    thumbnail: profile.photos && profile.photos.length > 0
    ? profile.photos[0].value
    : null,
   }).save();
   done(null,createuser);
}
})
)

