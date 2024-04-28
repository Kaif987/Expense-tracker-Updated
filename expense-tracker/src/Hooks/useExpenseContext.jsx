import { useContext } from "react"
import { ExpenseContext } from "../Context/ExpenseContext"

export const useExpenseContext = () =>{
    const context = useContext(ExpenseContext)

    if(!context){
        throw Error("useExpenseContext must be used inside ExpenseContextProvider")
    }

    return context
}

