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

app.post("/product",(req,res)=>{
    var pr_name = req.body.pname;
    var cat = req.body.category;
    var image = req.body.pimage;
    var desc = req.body.description;
    var time = req.body.time;
    var type = req.body.type;
    var slots = req.body.slots;

    var data = {
        "ProductName": pr_name,
        "Category" : cat,
        "Image": image,
        "Description" : desc,
        "Time": time,
        "Type": type,
        "Slots": slots
    }

    db.collection('product').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('admin_addproduct.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('admin_myproduct.html');
}).listen(3000);

