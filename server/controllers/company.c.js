const createError= require('http-errors')
const Company = require("../models/company")

const adminController = {
    get:async(req,res,next)=>{
        try {
            const company = await Company.find({})
            if (company){
                return res.status(200).json(company[0])
            }

        } catch (error) {
            next(createError(error.status||500,error.message))
            
        }
    },  
    update: async (req,res,next)=>{
        try {
            const company = req.body
            let updateCompany = await Company.findOne({
                id: company.id
            })
            for (const key in updateCompany) {
                if (key in company) {
                  updateCompany[key] = company[key];
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

module.exports = adminController