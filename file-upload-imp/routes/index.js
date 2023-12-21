var express = require('express');
var router = express.Router();
const usermodel=require("./users")
const postmodel=require("./post");
const passport = require('passport');
const upload=require("./multer")
const localStrategy=require("passport-local")
passport.use(new localStrategy(usermodel.authenticate()))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/createuser', async function(req, res, next) {
//   let user=await usermodel.create({
//     username: "harshal",
//     password:"harshal",
//     posts: [
//     ],
    
//     email: "harshal@gmail.com",
//     fullname: "Harshal atre"
//   })
//   res.send(user)
// });
// router.get('/createpost', async function(req, res, next) {
//   let post=await postmodel.create({
//     postText: "hello kaise ho",
//     user:'657dd0f5ca8492f4ac439ed7'
//   })
//  let user= await usermodel.findOne({_id:"657dd0f5ca8492f4ac439ed7"})
//  user.posts.push(post._id)
//  await user.save()
//  res.send('done')
// });
// router.get('/allpost', async function(req, res, next) {
//   let user=await usermodel.findOne({_id:"657dd0f5ca8492f4ac439ed7"}).populate("posts")
//   res.send(user)
// });
router.post("/register",function(req,res){
  const userdata=new usermodel({
    username: req.body.username,
    email: req.body.email,
    fullname:req.body.fullname
  })
  usermodel.register(userdata,req.body.password)
  .then(function(){
passport.authenticate("local")(req,res,function(){
res.redirect("/profile ")
}) 
  })
})

router.get('/profile', isLoggedin ,async function(req, res, next) {
  const user= await usermodel.findOne({username:req.session.passport.user}).populate("posts")
  console.log(user)
  res.render("profile",{user})
});
router.get('/feed', function (req, res, next){
  res.render("feed")
})
router.get("/login",function(req,res){
  // console.log(req.flash("error"))
  res.render("login",{error:req.flash("error")})
})    
router.post("/login",passport.authenticate("local",{
  successRedirect:"profile",
  failureRedirect:"/login",
  failureFlash:true
}),function(req,res){})



router.post("/upload",isLoggedin,upload.single('file'),async function(req,res){
if(!req.file){
  return res.status(400).send({err:"file not found"})
}
//save as post and give user id
const user =await usermodel.findOne({username:req.session.passport.user}).populate("posts")
const post = await postmodel.create({
  image:req.file.filename,
  imageText:req.body.filecaption,
  user:user._id
})
user.posts.push(post._id)
await user.save()
res.redirect("/profile")

})

router.get("/logout",function(req,res){
  req.logout(function(err){
     if(err){ return next(err);}
     res.redirect('/login');
  })
})

function isLoggedin(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");

}
module.exports = router;
