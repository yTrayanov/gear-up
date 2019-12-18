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
          title: product.title,
          description: product.description,
          price: product.price,
          author: product.author,
          image:product.image
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
        debugger;
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

router.post('/user/remove', (req,res) =>{
  let productId = req.body['productid'];
  let userid = req.body['userid'];

  let product;
  Product.findById(productId)
    .then((p) =>{
      product = p;
    })

  let currentUser = User.findById(userid)
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
  const mangaId = req.params.id;
  
  Product.findById(mangaId)
    .then((manga) => {
      if (!manga) {
        return res.status(200).json({
          success: false,
          message: 'Manga does not exists!'
        })
      }

      Product.findByIdAndDelete(mangaId)
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Manga deleted successfully!'
          })
        })
    })
});

router.post('/edit/:id',(req,res) =>{
  const mangaId = req.params.id;
  const updatedManga = req.body;

  Product.findById(mangaId)
    .then((manga) => {
      manga.title = updatedManga.title;
      manga.image = updatedManga.image;
      manga.description =updatedManga.description;
      manga.price = updatedManga.price;
      manga.description = updatedManga.description;

      manga.save();

      return res.status(200).json({
        success:true,
        message:'Updated manga successfully'
      })
    })
})

  

module.exports = router;
