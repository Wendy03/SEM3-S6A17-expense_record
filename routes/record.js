const express = require('express')
const Record = require('../models/record.js')
const { authenticated } = require('../config/auth')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { formCheck, registerFormCheck } = require('../models/validatorRule')

// 新增一筆 Record 頁面
router.get('/new', authenticated, (_req, res) => {
  return res.render('new', { style: 'index.css' })
})

// 新增一筆Record
router.post('/', authenticated, formCheck, (req, res) => {
  const { name, category, date, amount, merchant } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let errorMessages = []
    for (let i = 0; i < errors.array().length; i++) {
      errorMessages.push({ message: errors.array()[i]['msg'] })
    } res.render('new', {
      name,
      category,
      date,
      amount,
      merchant,
      errorMessages,
      style: 'index.css'
    })
  } else {
    const newRecord = new Record({
      name,
      category,
      date,
      amount,
      merchant,
      userId: req.user._id
    })
    // 存入資料庫
    newRecord.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  }

})

// 修改 Record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { record, style: 'index.css' })
  })
})

// 修改 Record
router.put('/:id', authenticated, formCheck, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      let errorMessages = []
      for (let i = 0; i < errors.array().length; i++) {
        errorMessages.push({ message: errors.array()[i]['msg'] })
        console.log(errorMessages)
      } res.render('edit', {
        record,
        errorMessages
      })
    } else {
      Object.assign(record, req.body)
      record.save(err => {
        if (err) return console.error(err)
        return res.redirect('/')
      })
    }

  })
})

// 刪除 Record
router.delete('/:id/delete', (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router