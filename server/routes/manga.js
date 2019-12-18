const express = require('express')
const authCheck = require('../middleware/auth-check');
const Manga = require('../models/Manga');
const User = require('../models/User');

const router = new express.Router();

router.post('/create' ,(req,res) => {
    debugger;
     const manga = req.body;
     Manga.create(manga)
        .then(() => {
            res.status(200).json({
                success:true,
                message:'Manga added successfully',
                manga
            })
        })
});

router.get('/all' , (req, res) => {
    Manga.find()
    .then((manga) => {
      return res.status(200).json(manga)
    })
});

router.get('/details/:id', (req, res) => {
    const id = req.params.id
    Manga.findById(id)
      .then((manga) => {
        if (!manga) {
          return res.status(404).json({
            success: false,
            message: 'Entry does not exists!'
          })
        }
  
        let response = {
          id,
          title: manga.title,
          description: manga.description,
          price: manga.price,
          author: manga.author,
          image:manga.image
        }
  
  
        res.status(200).json(response)
      })
});

router.post('/add' ,async (req,res) =>{
  const mangaId = req.body['mangaId'];
  const userId = req.body['userId']

  let manga = await Manga.findById(mangaId);

  let isAlreadyAdded = false;
  
  User.findById(userId)
  .populate('cart')
    .then((user) =>{
      for(let m of user.cart){
        debugger;
        if(manga.id === m.id){
          isAlreadyAdded = true;
        }
      }
      if(!isAlreadyAdded){
        user.cart.push(manga);
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
  let mangaId = req.body['mangaid'];
  let userid = req.body['userid'];

  let manga;
  Manga.findById(mangaId)
    .then((m) =>{
      manga = m;
    })

  let currentUser = User.findById(userid)
    .populate('cart')
    .then((user) =>{

     user.cart.remove(manga);

      user.save();
      return res.status(200).json({
        success:true,
        message:'removed successfully'
      })
    })
})

router.delete('/remove/:id', (req,res) =>{
  const mangaId = req.params.id;
  
  Manga.findById(mangaId)
    .then((manga) => {
      if (!manga) {
        return res.status(200).json({
          success: false,
          message: 'Manga does not exists!'
        })
      }

      Manga.findByIdAndDelete(mangaId)
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

  Manga.findById(mangaId)
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
