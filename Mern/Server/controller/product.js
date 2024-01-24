const fs = require('fs');
// const index = fs.readFileSync('index.html', 'utf-8');
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// const products = data.products;

const model=require("../model/product")
const Product=model.Product

//C R U D
//Create
exports.createProduct = async(req, res) => {
  // console.log(req.body);
  // products.push(req.body);
  const product=new Product(req.body)//->"new" is used only when we create
  try {
    const doc = await product.save();
    res.send({ code: 0, msg: "OK", obj: doc });
  } catch (err) {
    res.send({ code: -1, msg: 'ERROR' });
    console.log(err)
  }
};

exports.getAllProducts = async(req, res) => {
  const products=await Product.find()
  res.json(products);
};

exports.getProduct = async(req, res) => {
  const id = req.params.id;
  const product=await Product.findById(id)
  res.json(product);
};
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try{
    const doc= await Product.findOneAndReplace({_id:id}, req.body,{new:true})
    res.status(201).json(doc);
   }
   catch(err){
     return res.status(422).json({ error: err })
   }
};
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try{
   const doc= await Product.findByIdAndUpdate({_id:id}, req.body,{new:true})
   res.status(201).json(doc);
  }
  catch(err){
    return res.status(422).json({ error: err })
  }
};
exports.deleteProduct = async(req, res) => {
  const id = req.params.id;
  try{
    const doc= await Product.findByIdAndDelete(id)
    res.status(201).json(doc);
   }
   catch(err){
     return res.status(422).json({ error: err })
   }
};