const Investments = require('../models/Investments')

const create = async (req, res, next) => {
  try {
    let {
      typeInvestment,
      value,
      amount,
      code,
      date,
      userID
    } = req.body

    value = value.toString().replace(/\./g, '')
    value = value.replace(',', '.')

    let investment = await Investments.create({
      typeInvestment,
      value,
      amount,
      code,
      date,
      userID,
      total: value * amount
    })

    investment = await Investments.findById(investment._id)

    return res.status(201).send({ investment, message: 'Criado com sucesso' })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const index = async (req, res, next) => {
  try {
    const { userID } = req.query

    let query = {}

    if (userID) {
      query = { userID: userID }
    }

    const investments = await Investments.find(query)

    return res.send({ investments })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const show = async (req, res, next) => {
  try {
    const { investmentID } = req.params
    const investments = await Investments.findById(investmentID)

    return res.send({ investments })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const modify = async (req, res, next) => {
  try {
    const { investmentID } = req.params
    let {
      typeInvestment,
      value,
      amount,
      code,
      date,
      userID
    } = req.body

    value = value.toString().replace(/\./g, '')
    value = value.replace(',', '.')

    await Investments.updateOne({
      _id: investmentID
    }, {
      typeInvestment,
      value,
      amount,
      code,
      date,
      userID,
      total: value * amount
    }, {
      runValidators: true
    })

    const investment = await Investments.findById(investmentID).populate('subject')

    return res.send({ investment })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const destroy = async (req, res, next) => {
  try {
    const { investmentID } = req.params

    await Investments.deleteOne({
      _id: investmentID
    })

    return res.send({ message: 'Deletado com sucesso' })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

module.exports = {
  create,
  index,
  modify,
  show,
  destroy
}
