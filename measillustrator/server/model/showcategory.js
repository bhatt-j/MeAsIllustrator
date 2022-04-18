const mongoose = require('mongoose');
let categorySchema = new mongoose.Schema({
    Category_Name:String
});
module.exports=mongoose.model('category',categorySchema);