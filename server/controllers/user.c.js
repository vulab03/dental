const createError= require('http-errors')
const User = require("../models/user")

const userController = {
    getAll:async(req,res,next)=>{
        try {
            
            const limit = 6
            const page = req.query.page
            const amount = await User.countDocuments()
            const skip = (page - 1) * limit;
            const users = await User.find({})
              .skip(skip)
              .limit(limit)
            return res.status(200).json({list: users,amount})

        } catch (error) {
            next(createError(error.status||500,error.message))
            
        }
    },
    getByPhone: async (req,res,next)=>{
        try {
            
            const users = await User.find({phone:req.query.phone})
            return res.status(200).json({list: users})

        } catch (error) {
            next(createError(error.status||500,error.message))
            
        }
    },
    create: async (req,res,next)=>{
        try {
            const user = req.body
            
            const find = await User.findOne({id: user.id})

            if (find){
                return res.status(400).json({
                    "message": "the user already exists"
                })
            }
            
            const newUser = new User(user)

            await newUser.save()
            return res.status(200).json({
                "message": "created successfully"
            })
        } catch (error) {
            next(createError(error.status||500,error.message))
        }
    },
    findByPhone: async (req, res, next)=>{
        try {
            const id = req.query.phone
            const user = await User.find({phone})
            return res.status(200).json({
                list : user
            })
        } catch (error) {
            next(createError(error.status||500,error.message))
        }
    },
    findById: async (req, res, next)=>{
        try {
            let id = req.query.id
            id = id.split(' ').join('')
            const user = await User.findOne({id:id})
            console.log(user)
            if (user){
                return res.status(200).json({
                    user: user
                })
            }
            return res.status(400).json({
                "message": "Id not found"
            })
        } catch (error) {
            console.log(error)
            next(createError(error.status||500,error.message))
        }
    },
    update: async (req,res,next)=>{
        try {
            const user = req.body
            let updateUser = await User.findOne({
                id: user.id
            })
            for (const key in updateUser) {
                if (key in user) {
                  updateUser[key] = user[key];
                }
              }
            await updateUser.save()

            return res.status(200).json({
                "message": "Updated successfully"
            })
        } catch (error) {
            console.log(error)
            next(createError(error.status||500,error.message))
        }
    }    
}

module.exports = userController