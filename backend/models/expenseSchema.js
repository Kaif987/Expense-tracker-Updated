const mongoose = require("mongoose")

const Schema = mongoose.Schema

const expenseSchema = Schema(
    {
        name: {type: String, required: true}, 
        category: {type: String, required: true}, 
        date: {type: String, required: true},
        amount:{type: Number, required: true},
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    } ,
    {timestamps: true}
)

module.exports = mongoose.model("ExpenseItem", expenseSchema)