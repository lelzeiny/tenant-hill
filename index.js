const express = require('express'); 
const app = express(); 


const bodyParser = require('body-parser');

 


app.use(express.json());
app.use(bodyParser.json());


app.get('/api', (req, res) => {
    res.send("Hi Team"); 
});
// app.post();
// app.put();
// app.delete(); 



app.listen(8000, () => {

    console.log("The server is running on 8000"); 

})

// asynchronous in javascript 
// 