const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactUsSchema = new Schema({
  
  name:{
    type:String  
  },
  email: { 
    type: String
  },
  message: { 
    type: String
  },
});

const result = mongoose.model("contactus", ContactUsSchema);
module.exports = result;
