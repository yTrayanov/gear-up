const express = require('express')
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

const router = new express.Router();

router.post('/create/:id' ,async (req , res) =>{

    const order = req.body;
    await Order.create(order);

    let isAlreadyAdded = false;
  
    await User.findById(req.params.id)
    .populate('orders')
      .then((user) =>{
        for(let m of user.orders){
          if(order.id === m.id){
            isAlreadyAdded = true;
          }
        }
        if(!isAlreadyAdded){
          user.orders.push(order); 
          user.save();
        }
      });

      return res.status(200).json({
        success:true,
        message:'Order ddded '
      })
})
module.exports = router;