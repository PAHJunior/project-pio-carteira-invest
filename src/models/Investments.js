const mongoose = require('mongoose')
const moment = require('moment')

const InvestmentsSchema = mongoose.Schema({
  typeInvestment: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  code: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    get: formateDate,
    set: (value) => {
      if (value) {
        const date = moment(value, ['DD-MM-YYYY', 'DD/MM/YYYY']).set('hour', 13)
        return date
      }
    },
  },
  userID: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
}, {
  toJSON: { getters: true }
})

function formateDate(date) {
  if (date) {
    return moment(date)
      .format('DD-MM-YYYY')
  } else {
    return null
  }
}

const Investments = mongoose.model('Investments', InvestmentsSchema)

module.exports = Investments
