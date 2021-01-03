const {addHouse,
    commentOnHouse,
    priceComparison,
    findHouseByQuery
}  = require('../controllers/createHouse');
const express = require('express'); 
const app = express(); 
const router = express.Router(); 
const House = require('../models/house'); 

const multer = require('multer');
const path = require('path');
const axios = require('axios')

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

// router.post('/upload', upload.single('image'), (req, res, next) => {
//     try {
//         return res.status(201).json({
//             message: 'File uploded successfully'
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });

router.post('/api/house', addHouse);
router.post('/api/house/:id', commentOnHouse);

router.get('/api/gethouse/:id', async (req,res) => {
    const house = await House.findById(req.params.id); 
    return res.send(house); 
});

router.get('/api/getzipcode/:id', async (req,res) => {
    console.log("I am here", req.params.id.toString()); 
    const zipcode = req.params.id.toString(); 
    const house = await House.find({zipcode: zipcode}); 
    console.log("house", house);
    
    res.send(house);
} )


router.post('/api/getaddress', async (req,res) => {
    const {address} = req.body; 
    console.log(req.body); 
    console.log("address", address); 
    const house = await House.findOne({address: address});
    console.log(house); 
    res.send(house); 
});
router.post('/api/findhouse', async (req,res) => {
    const {address} = req.body; 
    console.log(req.body); 
    console.log("address", address); 
    const house = await House.findOne({address: address}).exec();
    console.log(house); 
    const realPrice = parseFloat(house.price)
    await axios.post('http://localhost:1080/predict', {
        address: house.address,
        zipcode: "93642",
        beds: 1,
        dog: "TRUE",
        cat: "TRUE",
        dishwasher: "TRUE",
        ac: "TRUE",
        laundry: "TRUE",
        parking: "TRUE",
        gym: "FALSE",	
        price : realPrice
    }).then((data) => {
        console.log("data",data.data);
        return res.send({
            house: house, 
            estimatedPrice: data.data.estimatedPrice,
            rating: data.data.rating,
        })
    }).catch((err) => {
        console.log("err", err)
    });
    res.send({
        status: "done"
    }); 
});
router.get('/api/house/price/:id', priceComparison); 


module.exports = router;