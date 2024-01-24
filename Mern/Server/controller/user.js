const fs = require('fs');
const model = require('../model/user')
const mongoose = require('mongoose');
const User = model.User;
const jwt=require("jsonwebtoken")
exports.createUser = async(req, res) => {
  // console.log(req.body);
  // Users.push(req.body);
  const user=new User(req.body)//->"new" is used only when we create
  const token=jwt.sign({email:req.body.email},"secret")
  user.token=token
  try {
    const doc = await user.save();
    res.send({ code: 0, msg: "OK", obj: doc });
  } catch (err) {
    res.send({ code: -1, msg: 'ERROR' });
    console.log(err)
  }
};


exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  console.log({id})
  const user = await User.findById(id).populate('cart');
  res.json(user);
};
exports.replaceUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndReplace({_id:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndUpdate({_id:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndDelete({_id:id})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};