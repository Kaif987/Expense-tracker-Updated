const ExpenseList = require('../models/expenseSchema')
const mongoose = require('mongoose')


// get all expenseListItems
const getExpenseItems = async (req, res) => {
  const { id } = req.user
  const expenseList = await ExpenseList.find({ user_id: id }).sort({ createdAt: -1 })
  res.status(200).json(expenseList)
}

// get a single expenseListItem
const getExpenseItem = async (req, res) => {
  const { id } = req.params
  const expenseList = await ExpenseList.findOne({ _id: id })

  if (!expenseList) {
    res.status(404).json({ error: 'No such ExpenseListItem' })
  }
  res.status(200).json(expenseList)
}

const createExpenseItem = async (req, res) => {
  const { name, category, date, amount } = req.body
  console.log({ name, category, date, amount })

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!category) {
    emptyFields.push('category')
  }
  if (!date) {
    emptyFields.push('date')
  }
  if (!amount) {
    emptyFields.push('amount')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  const user_id = req.user.id

  // add doc to db
  try {
    const expenseListItem = await ExpenseList.create({ name, category, date, amount, user_id })
    res.status(200).json(expenseListItem)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a WishList Item
const deleteExpenseItem = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such ExpenseListItem' })
  }

  const expenseListItem = await ExpenseList.findOneAndDelete({ _id: id })

  if (!expenseListItem) {
    return res.status(400).json({ error: 'No such ExpenseListItem' })
  }

  res.status(200).json(expenseListItem)
}

// update a expenseListItem
const updateExpenseItem = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such ExpenseListItem' })
  }

  const expenseListItem = await ExpenseList.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, { new: true })

  if (!expenseListItem) {
    return res.status(400).json({ error: 'No such ExpenseListItem' })
  }

  res.status(200).json(expenseListItem)
}


module.exports = { getExpenseItems, getExpenseItem, createExpenseItem, deleteExpenseItem, updateExpenseItem }