const mongoose = require('mongoose');
const quote = new mongoose.Schema({
    name:{
        type:String
    },
    quote:{
        type:String
    }
})


const mquote = mongoose.model('mquote',quote);
module.exports= mquote;