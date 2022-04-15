var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/MeAsIllustrator',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/user",(req,res)=>{
    var email = req.body.email;    
    var password = req.body.npassword;

    var data = {
        "Email": email,        
        "Password" : password
    }

    // db.collection('user').insertOne(data,(err,collection)=>{
    //     if(err){
    //         throw err;
    //     }
    //     console.log("Record Inserted Successfully");
    // });

    return res.redirect('forgetpassword.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('login.html');
}).listen(3000);

