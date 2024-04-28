import {createContext, useReducer, useEffect} from "react"
import {useUserContext} from "../Hooks/useUserContext"

export const ExpenseContext = createContext()

const expenseReducer = (state, action) =>{
    switch(action.type){
        case "SET_EXPENSE_LIST": 
            return {expense: action.payload}

        case "ADD_TO_EXPENSE_LIST":
            return {expense: [action.payload, ...state.expense]}

        case "DELETE_FROM_EXPENSE_LIST":
            return {expense: state.expense.filter((item) => item._id !== action.payload)}

        case "UPDATE_EXPENSE_LIST":
            return {expense: state.expense.map((item) => item._id === action.payload._id ? action.payload : item)}

        default :
            return state
    }
}

export const ExpenseContextProvider = ({children}) =>{
    const [state , dispatch] = useReducer(expenseReducer, {expense: []})
    const {user} = useUserContext()

    console.log(user)

    console.log("ExpenseContextProvider: ", state)

    useEffect(() =>{
        if(!user) return

        const fetchExpenses = async () =>{
            const res = await fetch("http://localhost:5000/api/expenses/", {
                headers:{
                    "Authorization": `Bearer ${user}` 
                },
            })
                
            const json = await res.json()
            if(res.ok){
                dispatch({type: "SET_EXPENSE_LIST", payload: json})
            }
        }
        fetchExpenses()

    },[user, dispatch])

    return (
        <ExpenseContext.Provider value = {{...state, dispatch}} >
            {children}
        </ExpenseContext.Provider>
    )
}

