
const mongoose = require("mongoose");
const Campground = require('../models/campground');
const cities= require('./cities')
const {places, descriptors} =require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp',{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', err => {
    logError(err);
  });
db.once('open',()=>{
    console.log("Database connected");
});
const sample = (array)=> array[Math.floor(Math.random()*array.length)];


const seedDB = async()=> {
    await Campground.deleteMany({});
    for(let i= 0;i<200;i++)
    {
        const random1000=Math.floor(Math.random()*1000);
        const price =Math.floor(Math.random()*20)+10;
        const camp= new Campground({
            author: '66d77980b7ffdded1f97306d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:[
                {
                    url: 'https://res.cloudinary.com/duu175xey/image/upload/v1725982169/Yelp/q1jycbok1xkbnq9lol7f.jpg',
                    filename: 'Yelp/q1jycbok1xkbnq9lol7f',
                  },
                  {
                    url: 'https://res.cloudinary.com/duu175xey/image/upload/v1725724039/Yelp/qsn0gwabjlzmlrttpsyn.jpg',
                    filename: 'Yelp/qsn0gwabjlzmlrttpsyn',
                  }
              
            ], 
            description: `Welcome to the campground, a perfect retreat for nature lovers and outdoor enthusiasts! 
            Nestled in the heart of the city, this campsite offers stunning landscapes and endless opportunities for adventure.`,
            price ,
            geometry: {
                type: 'Point',
                coordinates: [ cities[random1000].longitude,
                                cities[random1000].latitude ]
            }
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close()
});