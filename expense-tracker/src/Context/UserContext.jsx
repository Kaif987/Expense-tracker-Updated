import {createContext, useReducer, useEffect} from "react"

export const UserContext = createContext()

const userReducer = (state, action) =>{
    switch(action.type){
        case "LOGIN": 
            return {user: action.payload}

        case "LOGOUT":
            return {user: null}

        default :
            return state
    }
}

export const UserContextProvider = ({children}) =>{
    const [state , dispatch] = useReducer(userReducer, {user: null})

    console.log("UserContext State: ", state)

    useEffect(() =>{
        const user = localStorage.getItem("user")
        if(user) {
            dispatch({type: "LOGIN", payload: JSON.parse(user)})
        }

    }, [])

    return (
        <UserContext.Provider value = {{...state, dispatch}} >
            {children}
        </UserContext.Provider>
    )
}

