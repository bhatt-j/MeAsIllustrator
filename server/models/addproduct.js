const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  
  pname:{
    type:String  
  },
  category: { 
    type: String
  },
  description: { 
    type: String
  },
  time: { 
    type: String
  },
  type: { 
    type: String
  },
  slot: { 
    type: String
  },
});

const result = mongoose.model("product", ProductSchema);
module.exports = result;
