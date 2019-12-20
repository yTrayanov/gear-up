const express = require('express')
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const router = new express.Router();

router.post('/create/:id' ,async (req , res) =>{

    const product = await Product.findById(req.body.productId);


    const order = await Order.create({
        address:req.body.address ,
        addictionalInfo:req.body.addictionalInfo,
        product:product
    });
  
    await User.findById(req.params.id)
      .then((user) =>{
        user.orders.push(order); 
        user.save();
      });

      return res.status(200).json({
        success:true,
        message:'Order ddded '
      })
})
router.get('/all/:id' , (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
    .populate('orders')
        .then(user =>{
            console.log(user.orders)
            return res.status(200).json(user.orders);
        }).catch(err =>{
            console.log(error)
        })
});

router.get('/order/:id' , (req,res) =>{
    Order.findById(req.params.id)
        .then((order) =>{
            if(!order){
                return res.status(404).json({
                success: false,
                message: 'Entry does not exists!'
              })
            }   
            console.log(order)
            return res.status(200).json(order);
        }).catch(err =>{
            console.log(err);
        })
})
module.exports = router;