const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({

    email:{
        type:String,
        require:true,
    },
    hotline:{
        type:String,
        require:true,
    },
    address:{
        type:String,
    },

}, { timestamps: true });

const Company = mongoose.model('companys', CompanySchema);

module.exports = Company