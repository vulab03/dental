const mongoose = require('mongoose');

const IdSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true,
    },
    id:{
        type:String,
        require:true,
    }
}, { timestamps: true });

const Id = mongoose.model('ids', IdSchema);

module.exports = Id