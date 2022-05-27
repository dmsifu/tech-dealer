const express = require('express')
const router = express.Router()
const {getAllDeals, getBestDeals, getFilteredDeals} = require('../controllers/controller')

router.get('/allDeals', getAllDeals)
router.get('/bestDeals', getBestDeals)
router.get('/', getFilteredDeals)

module.exports = router