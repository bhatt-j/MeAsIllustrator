const mongoose = require('mongoose');
require('dotenv').config();
const Schema = require('mongoose').Schema;

const jwt = require("jsonwebtoken");
const studentSchema = mongoose.Schema({
    Name:{
        type:String,
        
    },
    mobile:{
        type:Number,
       
       
    },    
    email:{
        type:String,
       
       
    },
    password:{
        type:String,
       
    },

   tokens:[{
       token:{
           type:String
       }
   }]
    
    
//     sem: { type: Schema.Types.ObjectId, ref: "semester" },
//   branch: { type: Schema.Types.ObjectId, ref: "branch"}
})
studentSchema.methods.generateAuthToken = async function(){
    try{
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(error){
        console.log(error);
        res.send("the error part"+error);
    }
}


module.exports = mongoose.model('user',studentSchema)