const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { check, validationResult } = require('express-validator')
const { formCheck, registerFormCheck } = require('../models/validatorRule')

//登入頁面
router.get('/login', (_req, res) => {
  res.render('login', { style: 'login.css' })
})
//登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

//註冊頁面
router.get('/register', (_req, res) => {
  res.render('register', { style: 'login.css' })
})

//註冊檢查
router.post('/register', registerFormCheck, (req, res) => {
  const { name, email, password, password2 } = req.body
  const errors = validationResult(req)
  let errorMessages = []
  User.findOne({ email: email }).then(user => {
    if (user) {
      errorMessages.push({ message: '此 Email 已有人使用' })
      res.render('register', { name, email, style: 'login.css', errorMessages: errorMessages })
    } else if (!errors.isEmpty()) {
      for (let i = 0; i < errors.array().length; i++) {
        errorMessages.push({ message: errors.array()[i]['msg'] })
      }
      res.render('register', { name, email, style: 'login.css', errorMessages: errorMessages })
    } else {
      const newUser = new User({ name, email, password })
      //use bcrypt to form 'hash password'
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => {
              req.flash('success_msg', '註冊成功，請登入')
              res.redirect('/users/login')
            })
            .catch(err => console.log(err))
        })
      })
    }
  })
})


//登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})


module.exports = router