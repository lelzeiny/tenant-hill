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
router.post('/api/findhouse', async (req,res) => {
    const {address} = req.body; 
    console.log(req.body); 
    console.log("address", address); 
    const house = await House.findOne({address: address}).exec();
    console.log(house); 
    res.send(house); 
});
router.get('/api/house/price/:id', priceComparison); 


module.exports = router;