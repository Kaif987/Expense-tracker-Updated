import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ExpenseContextProvider } from './Context/ExpenseContext'
import { UserContextProvider } from './Context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <ExpenseContextProvider>
      <Router>
        <App />
      </Router>
    </ExpenseContextProvider>
  </UserContextProvider>
)
