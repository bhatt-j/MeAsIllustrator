const express = require('express');
const jwt=require("jsonwebtoken");
const route = express.Router()

var passport = require("passport");
const cookieParser = require("cookie-parser");
const decodeCookie = require("jwt-decode");
var LocalStrategy = require("passport-local");

route.use(cookieParser()); 


var bcrypt = require("bcrypt");
var selectedid;

var User = require("../models/student");
var contactus = require("../models/contactus");
var addproduct = require("../models/addproduct");
var showproduct = require("../models/showproduct");
const { cookie } = require('express-validator');
const { application } = require('express');
const cons = require('consolidate');
const { default: mongoose } = require('mongoose');

route.use(passport.initialize());
route.use(passport.session());

route.get('/', (req, res) => {
    
    res.render('signup');  

});

route.get('/signup', (req, res) => {
    
    res.render('signup');  

});

route.get('/login', (req, res) => {
    
    res.render('login');  

});

route.get('/illustrations', (req, res) => {
    
    res.render('illustrations');  

});

route.get('/doodle', (req, res) => {
    
    res.render('doodle');  

});

route.get('/family', (req, res) => {
    
    res.render('family');  

});

route.get('/invites', (req, res) => {
    
    res.render('invites');  

});



route.get('/profile', async (req, res) => {
    console.log(`this is cookies ${req.cookies.srms}`);
    var decoded =decodeCookie(req.cookies.srms);
    console.log(decoded._id);
    //console.log(decoded._id);
    const user = await User.findById(decoded._id);
    res.render('profile',{user});
});


route.get('/showproduct', async (req, res) => {
    const user = await addproduct.find();
    console.log(user);
    res.render('showproduct',{user});
});

route.get('/showproductuser', async (req, res) => {
    const user = await addproduct.find();
    console.log(user);
    res.render('showproductuser',{user});
});


route.get('/home', (req, res) => {
    
    res.render('home');  

});


route.get('/contactus', (req, res) => {
    
    res.render('contactus');  

});

route.get('/dashboard', (req, res) => {
    
    res.render('dashboard');  

});

route.get('/admin_dashboard', (req, res) => {
    
    res.render('admin_dashboard');  

});

route.get('/admin_profile', (req, res) => {
    
    res.render('admin_profile');  

});

route.get('/showproduct', (req, res) => {
    
    res.render('showproduct');  

});

route.get('/showproductuser', (req, res) => {
    
    res.render('showproductuser');  

});

route.get('/addproduct', (req, res) => {
    
    res.render('addproducts');  

});

route.get('/aboutus', (req, res) => {
    
    res.render('aboutus');  

});


route.post('/contactus', (req, res) => {
try{
    console.log(req.body);
        let newResult = new contactus({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        newResult.save();
        res.status(200).render("login");

    }catch(error){
        res.status(400).send("Invalid");
    }
    
});

route.post('/showproduct', (req, res) => {
    try{
        console.log(req.body);
            let newResult = new showproduct({
                pname: req.body.pname,
                category: req.body.category, 
                description: req.body.description,
                time: req.body.time,
                type: req.body.type, 
                slot: req.body.slot          
            });
            newResult.save();
            res.status(200).render("showproductuser");
    
        }catch(error){
            res.status(400).send("Invalid");
        }
        
    });

route.post('/addproduct', (req, res) => {
    try{
        console.log(req.body);
            let newResult = new addproduct({
                pname: req.body.pname,
                category: req.body.category, 
                description: req.body.description,
                time: req.body.time,
                type: req.body.type, 
                slot: req.body.slot          
            });
            newResult.save();
            res.status(200).render("showproduct");
    
        }catch(error){
            res.status(400).send("Invalid");
        }
        
    });
    
route.post('/login', async(req, res) => {
    try{
        const email=req.body.email;
        const password=req.body.password;
        const useremail = await User.findOne({email:email});

        if(email==="jbhatt@gmail.com" && password==="JBHATT")
        {
            res.render('admin_dashboard');
        }
        else{
        //console.log(`${email} ${password}`)
        if(useremail.password===password){
            const token = await useremail.generateAuthToken();
            res.cookie("srms",token,{
            expires:new Date(Date.now()+1800000),
           // httpOnly:true
        });
        
            res.status(200).render("home");
        }else{
            res.send("Check Credentials");
        }
    }
       //res.send(useremail);
        //console.log(useremail);

    }catch(error){
        res.status(400).send("Invalid");
    }

});




route.post('/signup', (req, res) => {
    try{
    console.log(req.body);
        let newUser = new User({
            Name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            password:req.body.password,
        });
        newUser.save();
        res.status(200).render("login");

    }catch(error){
        res.status(400).send("Invalid");
    }
    
})



module.exports=route;