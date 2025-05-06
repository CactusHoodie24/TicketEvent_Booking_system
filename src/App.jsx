import { useState } from 'react'
import './App.css'
import Register from './Pages/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes'
import Unathourized from './Pages/unathorized'
import Ticket from '../src/Pages/ticket'
import Event from '../src/Pages/events'
import Book from './Pages/book'
import Booked from './Pages/booked'
import Cart from './Pages/cart'
import Home from './Pages/Home'
function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />}></Route>
        <Route path='/unauthorized' element={<Unathourized />}></Route>
        <Route path='/booked' element={<ProtectedRoutes allowedRoles={['admin']}><Booked /></ProtectedRoutes>}></Route>
        <Route path='/event' element={<ProtectedRoutes allowedRoles={['admin']}><Event /></ProtectedRoutes>}></Route>
        <Route path='/cart' element={<ProtectedRoutes allowedRoles={['admin']}><Cart /></ProtectedRoutes>}></Route>
        <Route path='/event/:id' element={<ProtectedRoutes allowedRoles={['admin']}><Book /></ProtectedRoutes>}></Route>
        <Route path='/ticket' element={<ProtectedRoutes allowedRoles={['user']}><Ticket /></ProtectedRoutes>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
