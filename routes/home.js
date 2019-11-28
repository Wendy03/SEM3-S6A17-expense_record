const express = require('express')
const Record = require('../models/record.js')
const categoryList = require('../models/data/category.json').category
const router = express.Router()
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const filterMonth = req.query.filterMonth || ""
  const filterCategory = req.query.filterCategory || ""

  const categoryNameZh =
    categoryList[filterCategory] === undefined
      ? ""
      : categoryList[filterCategory]["name_zh"]


  const userId = req.user._id;
  let querySelect = { userId };
  if (filterMonth === "" && filterCategory !== "") {
    querySelect = { userId, category: filterCategory }
  } else if (filterMonth === "" && filterCategory !== "") {
    querySelect = { userId, category: filterCategory };
  } else if (filterCategory === "" && filterMonth !== "") {
    querySelect = {
      userId,
      date: {
        $gte: new Date(`2019-${filterMonth}-01`),
        $lte: new Date(`2019-${filterMonth}-31`)
      }
    };
  } else if (filterCategory !== "" && filterMonth !== "") {
    querySelect = {
      userId,
      date: {
        $gte: new Date(`2019-${filterMonth}-01`),
        $lte: new Date(`2019-${filterMonth}-31`)
      },
      category: filterCategory
    };
  }

  Record
    .find(querySelect)
    .sort({ date: 1 })
    .exec((err, records) => {
      if (err) return console.error(err)

      //show icons
      records.forEach(record => {
        record.icon = categoryList[record.category].image
      })

      let totalAmount = 0
      if (records.length > 0) {
        totalAmount = records.map(record => Number(record.amount)).reduce((a, b) => a + b)
      }

      const isDataEmpty = records.length === 0 ? true : false

      res.render("index", {
        style: 'index.css',
        records,
        totalAmount,
        filterCategory,
        filterMonth,
        categoryNameZh,
        isDataEmpty
      });
    });
})
module.exports = router