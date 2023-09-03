const createError= require('http-errors')
const Post = require("../models/post")

const adminController = {
    get:async(req,res,next)=>{
        try {
            const post = await Post.find({})
            if (post){
                return res.status(200).json(post[0])
            }

        } catch (error) {
            next(createError(error.status||500,error.message))
            
        }
    },  
    update: async (req,res,next)=>{
        try {
            const post = req.body
            let updatePost = await Post.findOne({
                id: post.id
            })
            for (const key in updatePost) {
                if (key in post) {
                  updatePost[key] = post[key];
                }
              }
            await updatePost.save()

            return res.status(200).json({
                "message": "Updated successfully"
            })

        } catch (error) {
            next(createError(error.status||500,error.message))
        }
    }
}

module.exports = adminController