const Investments = require('../models/Investments')

const findAndCountTypeInvestments = async (req, res, next) => {
  try {
    const { userID } = req.query

    const investments = await Investments.aggregate([
      { 
        $match: { 
          userID: userID
        } 
      },
      {
        $group: {
          _id: '$typeInvestment',
          count: { $sum: 1 }, 
          series: { $sum: '$total' }
        }
      }
    ]);

    const labels = []
    const count = []
    const series = []

    investments.forEach(x => {
      labels.push(x._id),
      count.push(x.count)
      series.push(x.series)
    });

    return res.send({ labels, count, series })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const findAndCountCodeInvestments = async (req, res, next) => {
  try {
    const { userID } = req.query

    const investments = await Investments.aggregate([
      { 
        $match: { 
          userID: userID
        } 
      },
      {
        $group: {
          _id: '$code',
          count: { $sum: 1 }, 
          series: { $sum: '$total' }
        }
      }
    ]);

    const labels = []
    const count = []
    const series = []

    investments.forEach(x => {
      labels.push(x._id),
      count.push(x.count)
      series.push(x.series)
    });

    return res.send({ labels, count, series })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}
module.exports = {
  findAndCountTypeInvestments,
  findAndCountCodeInvestments
}
