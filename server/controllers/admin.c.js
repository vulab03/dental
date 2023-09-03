const createError= require('http-errors')
const Admin = require("../models/admin")

const adminController = {
    get:async(req,res,next)=>{
        try {
            const admin = await Admin.find({})
            if (admin){
                return res.status(200).json(admin[0])
            }

        } catch (error) {
            next(createError(error.status||500,error.message))
            
        }
    },  
    update: async (req,res,next)=>{
        try {
            const admin = req.body
            let updateAdmin = await Admin.findOne({
                id: admin.id
            })
            for (const key in updateAdmin) {
                if (key in admin) {
                  updateAdmin[key] = admin[key];
                }
              }
            await updateAdmin.save()

            return res.status(200).json({
                "message": "Updated successfully"
            })

        } catch (error) {
            next(createError(error.status||500,error.message))
        }
    },
    login: async(req,res,next)=>{
        try {
            const {account,password} = req.body
            const isAdmin = await Admin.findOne({account: account, password: password})
            return res.status(200).json({
                "isAdmin": isAdmin?true:false
            })
        } catch (error) {
            console.log(error)
            next(createError(error.status||500,error.message))
        }
    }
}

module.exports = adminController