const mongoose = require('mongoose'); 

const houseSchema = new mongoose.Schema({
    address:{
        type: String, 
        required: true, 
    },
    price:{
        type:String, 
        required: true,
    },
    picture:{
        type:String, 
    },
    peopleRating:{
        type:Number,

    },
    beds:{
        type:Number, 
    },
    dog:{
        type: Boolean, 

    },
    cat:{
        type:Boolean,
    },
    dishwasher:{
        type:Boolean, 
    },
    ac: {
        type:Boolean, 
    },
    laundry:{
        type:Boolean, 
    },
    parking:{
        type:Boolean, 
    },
    gym: {
        type:Boolean, 
    },
    zipcode: {
        type:String, 
    },
    title: {
        type:String, 
    },
    reviews:
    [
        {
            name: {
                type:String,
            },
            comment:{
                type:String, 
            },
            contact:{
                type:String, 
            },
            rating:{
                type: Number, 
            }
        }
    ]
    
})


module.exports = mongoose.model('House', houseSchema);


