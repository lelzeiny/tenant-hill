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
                required: true
            },
        }
    ]
    
})


module.exports = mongoose.model('House', houseSchema);


