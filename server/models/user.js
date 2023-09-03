const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    id:{
        type:String,
        require:true,
    },
    dental:{
        type:String,
        require:true,
    },
    addressDental:{
        type:String,
    },
    address:{
        type: String,
    },
    nameCustomer:{
        type:String,
    },
    age:{
        type: Number,
    },
    phone:{
        type: String,
    },
    nameService:{
        type: String,
    },
    position:{
        type: String,
    },
    country:{
        type: String,
    },
    startDate: {
        type: String,
    },
    expireDate:{
        type: String,
    }

}, { timestamps: true });

const User = mongoose.model('users', UserSchema);

module.exports = User