const express = require('express')
const validator = require('../middleware/authenticator')
const router = express.Router()


const reportController = require('../controllers/report')

router.post('/getMonthReport',validator,reportController.postGetMonthReport)

router.post('/getYearReport',validator,reportController.postGetYearReport)

// router.post('/getReportGivenRange',validator,reportController.postGetReportGivenRange)

// router.post('/downloadReport',validator,reportController.postDownloadReport)

// router.get('/getDownloadsList/:uid',reportController.getDownloadList)

module.exports = router
