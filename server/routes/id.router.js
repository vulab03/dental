const router = require("express").Router();
const idController = require('../controllers/id.c')

router.get('/get',idController.get)
router.post('/update',idController.update)
router.post('/create',idController.create)

module.exports = router