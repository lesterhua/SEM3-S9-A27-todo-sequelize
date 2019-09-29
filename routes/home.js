const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User
const Todo = db.Todo

const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')

      return Todo.findAll({
        where: { UserId: req.user.id }
      })
    })
    .then((todos) => {
      return res.render('index', { todos: todos })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

//Sort
router.get("/name_asc", authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')

      return Todo.findAll({
        where: { UserId: req.user.id },
        order: [
          ['name', 'ASC']
        ]
      })
        .then((todos) => {
          return res.render('index', { todos: todos })
        })
        .catch((error) => {
          return res.status(422).json(error)
        })
    })
});

router.get("/name_desc", authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')

      return Todo.findAll({
        where: { UserId: req.user.id },
        order: [
          ['name', 'DESC']
        ]
      })
        .then((todos) => {
          return res.render('index', { todos: todos })
        })
        .catch((error) => {
          return res.status(422).json(error)
        })
    });
})


module.exports = router
