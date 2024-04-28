const express = require("express")
const router = express.Router()

const {getExpenseItems, getExpenseItem, createExpenseItem, deleteExpenseItem, updateExpenseItem} = require("../controller/expenseController")


router.get("/", getExpenseItems)

router.get("/:id", getExpenseItem)

router.post("/", createExpenseItem)

router.delete("/:id", deleteExpenseItem)

router.patch("/:id", updateExpenseItem)


module.exports = router