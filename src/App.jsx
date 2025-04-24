import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dumb from './dumb'
import Register from './Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import ProtectedRoutes from './ProtectedRoutes'
import Rap from './rap'
import Unathourized from './unathorized'
import Ticket from '../src/Pages/ticket'
import Event from '../src/Pages/events'
import Book from './Pages/book'
import Booked from './Pages/booked'
import Cart from './Pages/cart'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
      <Route path='/register' element={<Register />}></Route>
        <Route path='/unauthorized' element={<Unathourized />}></Route>
        <Route path='/booked' element={<ProtectedRoutes allowedRoles={['admin']}><Booked /></ProtectedRoutes>}></Route>
        <Route path='/event' element={<ProtectedRoutes allowedRoles={['admin']}><Event /></ProtectedRoutes>}></Route>
        <Route path='/cart' element={<ProtectedRoutes allowedRoles={['admin']}><Cart /></ProtectedRoutes>}></Route>
        <Route path='/event/:id' element={<ProtectedRoutes allowedRoles={['admin']}><Book /></ProtectedRoutes>}></Route>
        <Route path='/ticket' element={<ProtectedRoutes allowedRoles={['user']}><Ticket /></ProtectedRoutes>}></Route>
        <Route path='/dumb' element={<ProtectedRoutes allowedRoles={['user']}><Dumb /></ProtectedRoutes>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
