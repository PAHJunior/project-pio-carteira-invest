const express = require('express')
const router = express.Router()
// const Middlewares = require('../middlewares/Auth')

const {
  index,
  create,
  show,
  modify,
  destroy
} = require('../controllers/Investments')

// router.use(Middlewares)
router.get('/', index)
router.get('/:investmentID', show)
router.put('/:investmentID', modify)
router.post('/', create)
router.delete('/:investmentID', destroy)

module.exports = router
