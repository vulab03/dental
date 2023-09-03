const router = require("express").Router();
const userController = require('../controllers/user.c')

router.get('/get-all',userController.getAll)
router.post('/create',userController.create)
router.get('/find-id',userController.findById)
router.get('/find-phone',userController.findByPhone)
router.post('/update',userController.update)

module.exports = router

