const cloudinary=require('../Services/cloudinary');
const Image = require('../models/image');

const fileController={

    postFileToCloud:async(req,res,next)=>{
      try {
        const upload = await cloudinary.uploader.upload(req.file.path);
        return res.json({
          success: true,
          file: upload.secure_url,
        });
      } catch (error) {
        console.log(error)
      }
      
    },
    get:async(req,res,next)=>{
        try {
            const image = await Image.find({})
            if (image){
                return res.status(200).json(image[0])
            }

        } catch (error) {
            next(createError(error.status||500,error.message))
            
        }
    },  
    update: async (req,res,next)=>{
        try {
            const image = req.body.path
            let updateImage = await Image.findOne({})
            updateImage.path = image
            await updateImage.save()

            return res.status(200).json({
                "message": "Updated successfully"
            })

        } catch (error) {
            next(createError(error.status||500,error.message))
        }
    }
}


module.exports=fileController