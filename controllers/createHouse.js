
const House = require('../models/house');


const addHouse = async (req,res,next) => {
    const {address, price} = req.body; 

    const user = await House.create({
        address: address, 
        price: price, 
    }).then(() => {
        console.log("register successfully"); 
    });

    res.send(user); 

}


const commentOnHouse = (req,res,next) => {
    const id = req.params.id;
    const {name,comment,contact} = req.body; 
    House.findByIdAndUpdate(req.params.id, 
        {$push: {"reviews": {
                name: name,
                comment: comment,
                contact: contact,
               
            }}
        }
        ,
        (err) => {
            console.log(err); 
            console.log("successfully update job description"); 
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





module.exports = {
    addHouse,
    commentOnHouse,
    priceComparison
}