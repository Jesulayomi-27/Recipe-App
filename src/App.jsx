import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'

const App = () => {
  return (
    <BrowserRouter basename="/Recipe-App/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App

