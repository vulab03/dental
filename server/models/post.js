const mongoose = require('mongoose');

const PosSchema = new mongoose.Schema({

    tittle:{
        type:String,
        require:true,
    },
    warranty:{
        type:[String],
        require:true,
    },
    noAccept:{
        type:[String],
    },

}, { timestamps: true });

const Post = mongoose.model('posts', PosSchema);

module.exports = Post