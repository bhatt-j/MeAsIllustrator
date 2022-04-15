const mongoose = require('mongoose');
const express = require('express');
const app = express();

const DB = 'mongodb+srv://MeAsIllustrator:MeAsIllustrator@cluster0.6t8yd.mongodb.net/MeAsIllustrator?retryWrites=true&w=majority';
mongoose.connect(DB
    //     ,{
    //     useNewUrlParser:true,
    //     useCreateIndex:true,
    //     useUnifiedTopology:true,
    //     useFindAndModify:false
    // }
    ).then(()=>{
        console.log("connection successful");
    }).catch((err)=> console.log('no connection'));
    

//MeAsIllustrator
app.get('/',(req,res) => {
    res.send(`Hello world`);
});

app.listen(3000,() =>{
    console.log(`Server is running`);
});