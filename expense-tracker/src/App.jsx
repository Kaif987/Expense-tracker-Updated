import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useUserContext } from './Hooks/useUserContext'
import EditExpense from './pages/EditExpense'

function App() {
  const {user} = useUserContext()

  return (
    <div className='px-9 py-4 font-poppins '>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path='/edit/:id' element={user ? <EditExpense /> : <Navigate to="/login" />} />
        <Route path='login' element={!user ? <Login /> : <Navigate to="/"/>} />
        <Route path='register' element={!user ? <Register /> : <Navigate to="/"/>} />
      </Routes>
    </div>
  )
}

export default App
