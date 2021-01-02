const House = require('../models/house');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


const addHouse = async (req,res,next) => {
    const {address, price} = req.body; 

    const user = await House.create({
        address: address, 
        price: price, 
        peopleRating: 0,
    }).then(() => {
        console.log("register successfully"); 
    });

    res.send(user); 

}


const commentOnHouse = async (req,res,next) => {
    const id = req.params.id;
    const {name,comment,contact, rating} = req.body; 
    const house = await House.findById(id); 
    await House.findByIdAndUpdate(req.params.id, 
        {   $push: {"reviews": {
                    name: name,
                    comment: comment,
                    contact: contact,
                    rating: rating
                }},
            
           
        }
        ,
        (err) => {
            console.log(err); 
            console.log("successfully update job description"); 
        }
    )


    await House.findByIdAndUpdate(req.params.id, {
        peopleRating: ((house.peopleRating)*(house.reviews.length) + rating)/((house.reviews.length) + 1),  
    }, (err) => {
        console.log(err); 
        console.log("update rating")
    })
   
}


const priceComparison = async (req,res,next) => {
    const id = req.params.id;

    const {estimatedPrice } = req.body; 


    const house = await House.findById(id); 
    const actualPrice = parseFloat(house.price)
    console.log("house",house);
    console.log("price",actualPrice);


    const result = estimatedPrice - actualPrice; 
    console.log("result", result); 
    if(result < 0){
        return res.send({status: "bad"});
    }
    else if(result >= 0){
        return res.send({status: "good"});
    }


}





module.exports = {
    addHouse,
    commentOnHouse,
    priceComparison
}