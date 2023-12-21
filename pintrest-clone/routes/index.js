var express = require('express');
var router = express.Router();
var usermodel = require('./users');
var postmodel=require('./post')
const passport = require('passport');
const localStrategy = require('passport-local')
const upload=require('./multer')
passport.use(new localStrategy(usermodel.authenticate()));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
}); 

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/profile', isLoggedIn,async function(req, res, next) {
 const user=await usermodel.findOne({username:req.session.passport.user}).populate('posts')
 res.render('profile',{user:user})
});

router.get('/show/posts', isLoggedIn,async function(req, res, next) {
  const user=await usermodel.findOne({username:req.session.passport.user}).populate('posts')
  res.render('show',{user:user})
 });

 router.get('/feed', isLoggedIn,async function(req, res, next) {
  const user=await usermodel.findOne({username:req.session.passport.user}).populate('posts')
  const posts=await postmodel.find().populate('user')
  res.render('feed',{user:user,posts:posts})
 });

router.get('/add',async function(req, res, next) {
 const user=await usermodel.findOne({username:req.session.passport.user})
  res.render('add',{user:user});
});

router.post('/createpost', isLoggedIn, upload.single("postimage"),async function(req, res, next) {
 const user=await usermodel.findOne({username:req.session.passport.user})
 const post =await postmodel.create({
  user:user._id,
  title:req.body.title,
  image:req.file.filename,
  description:req.body.description
})
user.posts.push(post._id)
await user.save()
res.redirect("/profile")
});

router.post('/fileupload', isLoggedIn,upload.single('image'),async function(req, res, next) {
 const user=await usermodel.findOne({username:req.session.passport.user})
 user.profileImage=req.file.filename 
 await user.save()
 res.redirect("/profile")
});

router.post('/register', function(req, res, next) {
  const data=new usermodel({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact, 
    name:req.body.fullname, 
  })
  usermodel.register(data, req.body.password)
  .then(function(){
    passport.authenticate('local')(req, res, function() {
      res.redirect('/profile');
    });
  })
});

router.post('/login', passport.authenticate('local', {
  SuccessRedirect: '/profile',
  FailureRedirect: '/',
  // failureflash: true
}), function(req, res) {
  res.redirect('/profile');
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if(err){return next(err);}
  });
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
module.exports = router;
