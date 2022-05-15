const express = require('express')
const router = express.Router()
const getTodaysOffers = require('../controllers/controller')

router.get('/', getTodaysOffers)

module.exports = router