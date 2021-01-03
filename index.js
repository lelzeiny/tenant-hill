const express = require('express'); 
const app = express(); 

const cors = require('cors');
const bodyParser = require('body-parser');
const connectDatabase = require('./config/database');
const houseRoutes = require('./routes/houseRoutes');

const { cloudinary } = require('./utils/cloudinary');
const multer = require('multer');
const path = require('path');


app.use(cors());
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(houseRoutes);



app.get('/api/images', async (req, res) => {
    console.log("getting images");
    const { resources } = await cloudinary.search
        .expression('folder:j4pfojws')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});
app.post('/api/upload', async (req, res) => {
    console.log("getting to upload");
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'j4pfojws',
        });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

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