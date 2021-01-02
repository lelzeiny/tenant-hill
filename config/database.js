const mongoose = require('mongoose'); 

const connectDatabase = () => {
    mongoose.connect('mongodb+srv://tenant:nhatnhat@cluster0.gtzdk.mongodb.net/test', {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB Database with host: ${con.connection.host}`);
    }).catch(err => {
        console.log(err);
    })
}


module.exports = connectDatabase;