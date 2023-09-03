const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({

    path:{
        type:String,
        require:true,
    },

}, { timestamps: true });

const Image = mongoose.model('images', ImageSchema);

module.exports = Image