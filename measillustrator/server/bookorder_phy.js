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

app.post("/order",(req,res)=>{
    var name = req.body.name;
    var addr = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var pin = req.body.pincode;

    var data = {
        "Name": name,
        "Address" : addr,
        "City": city,
        "State" : state,
        "Pincode" : pin
    }

    db.collection('order').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('Bookorder_phy.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('Bookorder_phy.html');
}).listen(3000);

