var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
//const showcategory = require('./model/showcategory.js');
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect('mongodb+srv://measillustrator:202112055@cluster0.7h0ce.mongodb.net/measillustrator',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', '');
app.set('view engine', 'ejs');

app.post("/user",(req,res)=>{
    var name = req.body.name;
    var mobile = req.body.mobile;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "Name": name,
        "MobileNo" : mobile,
        "Email": email,
        "Password" : password
    }

    db.collection('user').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('login.html')

})

app.post("/contactus",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;

    var data = {
        "Name": name,
        "Email": email,
        "Message" :message
    }

    db.collection('contact_us').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('contactus.html')

})

app.post("/addfeedback",(req,res)=>{
    var feed = req.body.feedback;
    
    var data = {
        //"UID": email,
        "FeedBack": feed        
    }

    db.collection('feedback').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('contactus.html')

})


app.post("/addcategory",(req,res)=>{
    var name = req.body.name;
    var data = {
        "Category_Name": name,
    }

    db.collection('category').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('admin_addcategories.html')

})

app.post("/addproduct",(req,res)=>{
    var name = req.body.name;
    var cname = req.body.cname;
    var image = req.body.image;
    var description = req.body.description;
    var e_time = req.body.e_time;
    var type = req.body.type;
    var slot = req.body.slot;
    var data = {
        "Product_Name": name,
        "Category_Name": cname,
        "Product_Image": image,
        "Description": description,
        "Estimation_Time": e_time,
        "Type": type,
        "Slot": slot
    }

    db.collection('product').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('admin_addproduct.html')

})

app.post("/home",(req,res)=>{
    return res.redirect('home.html');
});

app.post("/Bookorder_phy",(req,res)=>{
    var fav_language = req.body.fav_language;
    var character = req.body.character;
    var img = req.body.img;
    var comments = req.body.comments;
    var qty =  req.body.qty;
    var date =  req.body.date;

    var data = {
        "Theme": fav_language,
        "character":character,
        "img": img,
        "comments": comments,
        "qty": qty,
        "date": date

    }

    db.collection('order_master').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });


    return res.redirect('Bookorder_phy.html');
});

app.post("/Bookorder_digi",(req,res)=>{
    var fav_language = req.body.fav_language;
    var character = req.body.character;
    var img = req.body.img;
    var comments = req.body.comments;
    var date =  req.body.date;

    var data = {
        "Theme": fav_language,
        "character":character,
        "img": img,
        "comments": comments,
        "date": date

    }

    db.collection('order_master').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('Bookorder_digi.html');
});


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('login.html');
}).listen(3000);

