const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');
var db = 'mongodb://localhost/issues';
mongoose.Promise = global.Promise;
mongoose.connect(db,function(err){
    if(err) {
        console.log("Error! ");
    } else {
        console.log("connected to db");
    }
})

router.get('/videos',function(req,res){
    console.log('Get request for all videos');
    Video.find({})
    .exec(function(err,videos) {
        if(err) {
            console.log('Error retrieving videos');
        } else {
           res.json(videos); 
        }
    });
});

router.get('/videos/:id',function(req,res){
    console.log('Get request for single video');
    Video.findById(req.params.id)
    .exec(function(err,video) {
        if(err) {
            console.log('Error retrieving videos');
        } else {
           res.json(video); 
        }
    });
});


router.post('/video' ,function(req,res) {
    console.log('Post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertedVideo) {
        if(err) {
            console.log('Error saving the video');
        } else {
            res.json(insertedVideo);
        }
    });
});

router.put('/video/:id',function(req,res){
    console.log('update a video');
    Video.findByIdAndUpdate(req.params.id,
    {
      $set : {title:req.body.title, url:req.body.url, description:req.body.description}
    },
    {
        new:true
    },
   function(err,updateVideo) {
        if(err) {
            res.send('error updating video');
        } else {
            res.json(updated);
        }
   }
    )
});

module.exports = router;