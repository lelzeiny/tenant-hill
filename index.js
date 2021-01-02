const express = require('express'); 
const app = express(); 


const bodyParser = require('body-parser');
const connectDatabase = require('./config/database');
const houseRoutes = require('./routes/houseRoutes');

const multer = require('multer');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(houseRoutes);

app.get('/api', (req, res) => {
    res.send("Hi Team"); 
});
// app.post();
// app.put();
// app.delete(); 

connectDatabase();

app.listen(8000, () => {

    console.log("The server is running on 8000"); 

})

// asynchronous in javascript 
// 