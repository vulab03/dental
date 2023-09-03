const router = require("express").Router();
const fileController = require('../controllers/file.c')
const uploader = require('../Services/multer')


router.post('/upload',uploader.single('file'),fileController.postFileToCloud)
router.get('/get',fileController.get)
router.post('/update',fileController.update)

module.exports = router

