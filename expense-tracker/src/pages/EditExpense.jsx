import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useExpenseContext } from '../Hooks/useExpenseContext'
import { useUserContext } from '../Hooks/useUserContext'

export default function EditExpense() {
    const {id} = useParams()
    const navigate = useNavigate()
    const {user} = useUserContext()

    const initialExpense = {
        name: '',
        description: '',
        date: '',
        amount: ''
    }

    useEffect(() => {
        const fetchExpense = async () => {
            const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
                headers:{
                "Authorization": `Bearer ${user}` 
            },
            })
               const {name, category, date, amount} = await response.json()
            if(!response.ok) console.log(json.error)
            setExpense(prev => ({...prev, name, category, date, amount})) 
        }
        fetchExpense()
    },[] )    

    const [expense, setExpense] = useState(initialExpense)
    const {dispatch} = useExpenseContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {name, category, date, amount} = expense
        const {email} = user

        
        const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, category, date, amount, user_email:email})
        })

        const json = await response.json()
        dispatch({type: "UPDATE_EXPENSE_LIST", payload: json})
        navigate("/")
    }

    const onChangeHandler = (e) => {
        setExpense(
            {
            ...expense, 
            [e.target.name]: e.target.value
            }
        )
    }

    const onClose = () => {
        setExpense(initialExpense)
        navigate("/")
    }

  return (
    <div className='mt-3'>
        <h1 className='font-bold text-2xl text-gray-800'>Edit Expense</h1>
        <form onSubmit={handleSubmit} className= "flex flex-col gap-3 mt-4" >
            <div className='flex flex-col'>
                <label className='font-bold' htmlFor="name">Name</label>
                <input className='px-8 py-1 bg-input rounded-sm text-gray-500 font-medium  placeholder:text-current' onChange={onChangeHandler}  type="text" name="name" id="name" value={expense.name} placeholder='Name the Expense'/>
            </div>
            <div className='flex flex-col'>
                <label className='font-bold' htmlFor="description">Description</label>
                <input className='px-8 py-1 bg-input rounded-sm text-gray-500 font-medium  placeholder:text-current' onChange={onChangeHandler} type="text" name="description" id="name" value={expense.description} placeholder='Describe the Expense'/>
            </div>
            <div className='flex flex-col'>
                <label className='font-bold' htmlFor="category">Category</label>
                <select name="category" id="category" value={expense.category} 
                onChange={onChangeHandler} className='px-8 py-1 bg-input rounded-sm text-gray-500 font-medium  placeholder:text-current' 
                >
                    <option value="books">Books</option>
                    <option value="health">Health</option>
                    <option value="electronics">Electronics</option>
                    <option value="travels">Travels</option>
                    <option value="education">Education</option>
                </select>
            </div>
            <div className='flex flex-col'>
                <label className='font-bold' htmlFor="date">Date of Expense</label>
                <input className='px-8 py-1 bg-input rounded-sm text-gray-500 font-medium  placeholder:text-current' onChange={onChangeHandler} type="date" name="date" value={expense.date} id="date" placeholder='Date of Expense (date-picker)'/>
            </div>
            <div className='flex flex-col'>
                <label className='font-bold' htmlFor="amount">Expense Amount</label>
                <input className='px-8 py-1 bg-input rounded-sm text-gray-500 font-medium  placeholder:text-current' onChange={onChangeHandler} type="number" name="amount" id="amount" value={expense.amount} placeholder='Expense Amount in INR' />
            </div>
            <div className='flex justify-between mt-8'>
                <button onClick={onClose} className="bg-gray-500 text-white px-8 py-1 rounded" >Cancel</button>
                <input type="submit" value="Create Expense" className='bg-green-500 text-white px-4 py-1 rounded' />
            </div>
        </form>
    </div>
  )
}
