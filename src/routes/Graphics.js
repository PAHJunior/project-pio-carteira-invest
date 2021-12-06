const express = require('express')
const router = express.Router()
// const Middlewares = require('../middlewares/Auth')

const {
  findAndCountTypeInvestments,
  findAndCountCodeInvestments
} = require('../controllers/Graphics')

// router.use(Middlewares)
router.get('/count-types', findAndCountTypeInvestments)
router.get('/count-codes', findAndCountCodeInvestments)

module.exports = router
