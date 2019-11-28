const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user.js')
const Record = require('../record.js')
const record = require('../data/record.json').records
const users = require('../data/users.json').users

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')
  // 創造使用者
  users.forEach((user, index) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        const newUser = new User({
          name: user.name,
          email: user.email,
          password: hash
        })
        newUser.save()
          .then(user => {
            for (let i = index * 4; i < (index + 1) * 4; i++) {
              Record.create({
                name: record[i].name,
                date: record[i].date,
                category: record[i].category,
                amount: record[i].amount,
                userId: user._id
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
  })
  console.log('done')
})