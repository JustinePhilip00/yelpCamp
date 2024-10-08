const express= require('express');
const router= express.Router();
const catchAsync= require('../utils/catchAsync');

const campgrounds = require('../controllers/campgrounds');
const ExpressError = require("../utils/ExpressError");
const Campground = require('../models/campground');
const {campgroundSchema, reviewSchema}= require('../schemas.js');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const multer  = require('multer')
const {storage}= require('../cloudinary');
const upload= multer({storage })

router.route('/')
    .get(catchAsync(campgrounds.index))
     .post(isLoggedIn, upload.array('image'),validateCampground ,catchAsync(campgrounds.createCampground))
    // .post(upload.array('image',12), (req,res)=>{
    //     console.log(req.body,req.files);
    //     res.send("worked");
    //})
    
router.get('/new',isLoggedIn,campgrounds.renderNewForm)
    
router.route('/:id')
    .get(  catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'),validateCampground,catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));



module.exports= router;