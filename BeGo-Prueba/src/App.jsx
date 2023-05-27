//import { useState } from 'react'
import './App.css'
import Order from './componets/orders'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cargo from './componets/cargo'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Order/>}/>
       <Route path="/cargo" element={<Cargo/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
