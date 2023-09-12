const createError= require('http-errors')
const IdSchema = require("../models/id")

const idController = {
    create: async(req,res,next)=>{
        try {
            const newId = new IdSchema(req.body)
            await newId.save()
            return res.json({"msg":"oke"})
        } catch (error) {
            next(createError(error.status||500,error.message))
        }
    },
    get:async(req,res,next)=>{
        try {
            const id = await IdSchema.find({})
            if (id){
                return res.status(200).json(id[0])
            }

        } catch (error) {
            next(createError(error.status||500,error.message))
            
        }
    },  
    update: async (req,res,next)=>{
        try {
            const id = req.body
            let updateCompany = await IdSchema.findOne()
            for (const key in updateCompany) {
                if (key in id) {
                  updateCompany[key] = id[key];
                }
              }
            await updateCompany.save()

            return res.status(200).json({
                "message": "Updated successfully"
            })

        } catch (error) {
            next(createError(error.status||500,error.message))
        }
    }
}

module.exports = idController