const router = require("express").Router();
const companyController = require('../controllers/company.c')

router.get('/get',companyController.get)
router.post('/update',companyController.update)

module.exports = router

