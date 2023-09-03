const router = require("express").Router();
const postController = require('../controllers/post.c')

router.get('/get',postController.get)
router.post('/update',postController.update)

module.exports = router

