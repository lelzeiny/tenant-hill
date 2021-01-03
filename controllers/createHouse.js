const House = require('../models/house');
const multer = require('multer');
const {cloudinary} = require('../utils/cloudinary');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }
// const upload = multer({ storage: storage, fileFilter: fileFilter });


const addHouse = async (req,res,next) => {


    console.log("getting to upload");
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'j4pfojws',
        });
        console.log(uploadResponse);


        const {address, price} = req.body; 

        const user = await House.create({
            address: address, 
            price: price, 
            picture: uploadResponse.url,
            peopleRating: 0,
        }).then(() => {
            console.log("register successfully"); 
        });
    
        res.send(user); 
       
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }


   

}


const commentOnHouse = async (req,res,next) => {
    const id = req.params.id;
    const {name,comment,contact, rating} = req.body; 
    const house = await House.findById(id); 
    await House.findByIdAndUpdate(req.params.id, 
        {   $addToSet: {"reviews": {
                    name: name,
                    comment: comment,
                    contact: contact,
                    rating: rating
                }}
           
        }
        ,
        () => {
            
            console.log("successfully update comment"); 
        }
    )


   
   
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



const findHouseByQuery = async (req,res) => {
    const {address} = req.body;


    console.log("query", address);

    // const house = await House.findOne({address: query}).exec()


    // res.send(house); 

}





module.exports = {
    addHouse,
    commentOnHouse,
    priceComparison,
    findHouseByQuery
}