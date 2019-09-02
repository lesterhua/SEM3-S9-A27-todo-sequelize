const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User
const Todo = db.Todo

const { authenticated } = require('../config/auth')

// create page
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

//create action
router.post('/new', authenticated, (req, res) => {
  Todo.create({
    name: req.body.name,
    done: false,
    UserId: req.user.id
  })
    .then((todo) => {
      return res.redirect('/')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

//detail page
router.get('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')
      return Todo.findOne({
        where: {
          UserId: req.user.id,
          id: req.params.id
        }
      })
    })
    .then((todo) => {
      return res.render('detail', { todo: todo })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

//edit page
router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')
      return Todo.findOne({
        where: {
          id: req.params.id,
          UserId: req.user.id
        }
      })
    })
    .then((todo) => {
      return res.render('edit', { todo: todo })
    })
})

//edit action
router.put('/:id', authenticated, (req, res) => {
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((todo) => {
      todo.name = req.body.name
      todo.done = req.body.done === "on"

      return todo.save()
    })
    .then((todo) => { return res.redirect('/todos/' + req.params.id) })
    .catch((error) => { return res.status(422).json(error) })
})

//delete action 
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')
      return Todo.destroy({
        where: {
          id: req.params.id,
          UserId: req.user.id
        }
      })
    })
    .then((todo) => {
      return res.redirect('/')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

module.exports = router