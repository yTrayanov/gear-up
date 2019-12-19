const express = require('express')
const authCheck = require('../middleware/auth-check');
const Product = require('../models/Product');
const User = require('../models/User');

const router = new express.Router();


router.post('/create' ,(req,res) => {
     const product = req.body;
     Product.create(product)
        .then(() => {
            res.status(200).json({
                success:true,
                message:'Product added successfully',
                manga: product
            })
        })
});

router.get('/all' , (req, res) => {
    Product.find()
    .then((product) => {
      return res.status(200).json(product)
    })
});

router.get('/details/:id', (req, res) => {
    const id = req.params.id

    Product.findById(id)
      .then((product) => {
        if (!product) {
          return res.status(404).json({
            success: false,
            message: 'Entry does not exists!'
          })
        }
  
        let response = {
          id,
          name: product.name,
          image: product.image,
          price: product.price,
        }
  
  
        res.status(200).json(response)
      })
});

router.post('/add' ,async (req,res) =>{
  const productId = req.body['productId'];
  const userId = req.body['userId']

  let product = await Product.findById(productId);

  let isAlreadyAdded = false;
  
  User.findById(userId)
  .populate('cart')
    .then((user) =>{
      for(let m of user.cart){
        if(product.id === m.id){
          isAlreadyAdded = true;
        }
      }
      if(!isAlreadyAdded){
        user.cart.push(product);
        user.save();
      }
    });

  return res.status(200).json({
    success:true,
    message:'Manga ddded to user cart'
  })

});

router.get('/user/:id', (req,res)=>{
  let userId = req.params.id;
  User.findById(userId)
    .populate('cart')
    .then((user)=>{
      return res.status(200).json(user.cart);
    });
})

router.post('/user/remove',async (req,res) =>{
  let productId = req.body['productId'];
  let userid = req.body['userId'];

  let product;
  Product.findById(productId)
    .then((p) =>{
      product = p;
    })

  await User.findById(userid)
    .populate('cart')
    .then((user) =>{

     user.cart.remove(product);

      user.save();
      return res.status(200).json({
        success:true,
        message:'Removed successfully'
      })
    })
})

router.delete('/remove/:id', (req,res) =>{
  const productId = req.params.id;
  
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(200).json({
          success: false,
          message: 'Product does not exists!'
        })
      }

      Product.findByIdAndDelete(productId)
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Product deleted successfully!'
          })
        })
    })
});

router.post('/edit/:id',(req,res) =>{
  const productId = req.params.id;
  const updateProduct = req.body;

  Product.findById(productId)
    .then((product) => {
      product.name = updateProduct.name;
      product.image = updateProduct.image;
      product.price =updateProduct.price;

      product.save();

      return res.status(200).json({
        success:true,
        message:'Updated product successfully'
      })
    })
})

router.get('/check/:productId/:userId' ,async (req , res) =>{
  const productId = req.params.productId;
  const userId = req.params.userId;
  let product = await Product.findById(productId);

  User.findById(userId)
  .populate('cart')
    .then((user) =>{
      for(let m of user.cart){
        if(product.id === m.id){
          return res.status(200).json({isAdded:'true'})
        }
      }

      return res.status(200).json({isAdded:'false'})
    });

})

module.exports = router;
