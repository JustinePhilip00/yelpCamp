const Campground = require('../models/campground');
const {cloudinary} = require('../cloudinary');
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
}

module.exports.renderNewForm =(req,res)=>{
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req,res)=>{
    // if(!req.body.campground) throw new ExpressError("invalid Campground Data",400);
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const campground= new Campground(req.body.campground);
    campground.geometry = geoData.features[0].geometry;
    campground.image = req.files.map(f=>({url: f.path, filename:f.filename}));
    campground.author=req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success','Success');
    res.redirect(`/campgrounds/${campground._id}`)
     
}

module.exports.showCampground= async(req,res,next)=>{
    const campground = await Campground.findById(req.params.id).populate(
        {path:'reviews',
        populate:{
            path:'author'
        }

    }).populate('author');
    console.log(campground);
    // console.log(campground);
    if(!campground){
        req.flash('error','Cannot find the requested Campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{campground});
}

module.exports.renderEditForm= async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error','Cannot find the requested Campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit',{campground});
}

module.exports.updateCampground = async(req,res)=>{
    //    res.send(req.body);
       const {id}= req.params;
       console.log(req.body);
        const updatedCamp = await Campground.findByIdAndUpdate(id, req.body.campground,{new:true});
        const imgs = req.files.map(f=>({url: f.path, filename:f.filename}))
        updatedCamp.image.push(...imgs);
        await updatedCamp.save();
        if (req.body.deleteImages) {
            for(let filename of req.body.deleteImages)
            {
                await cloudinary.uploader.destroy(filename);
            }
            await updatedCamp.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } })
            console.log(updatedCamp);

        }

        req.flash('success', 'Success');
        res.redirect(`/campgrounds/${updatedCamp._id}`);
    }

module.exports.deleteCampground =async (req,res)=>{
    const {id} = req.params;
    const deletedCamp = await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully Deleted the Campground')
    res.redirect("/campgrounds");

}