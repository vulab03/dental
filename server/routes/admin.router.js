const router = require("express").Router();
const adminController = require('../controllers/admin.c')

router.get('/get',adminController.get)
router.post('/update',adminController.update)
router.post('/login',adminController.login)

module.exports = router