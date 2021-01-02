const {addHouse,
    commentOnHouse,
    priceComparison
}  = require('../controllers/createHouse');
const express = require('express'); 
const app = express(); 
const router = express.Router(); 


router.post('/api/house', addHouse);
router.post('/api/house/:id', commentOnHouse);
router.get('/api/house/price/:id', priceComparison); 


module.exports = router;