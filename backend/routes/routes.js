const express = require('express')
const router = express.Router()
const getTodaysPrices = require('../controllers/controller')

router.get('/', getTodaysPrices)

module.exports = router