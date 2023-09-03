const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    account:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    password:{
        type:String,
    },

}, { timestamps: true });

const Admin = mongoose.model('admins', AdminSchema);

module.exports = Admin