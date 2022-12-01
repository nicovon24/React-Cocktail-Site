import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import pages
import Home from './pages/Home'
import About from './pages/About'
import SingleCocktail from './pages/CocktailDetails'
import Error from './pages/Error'
// import components
import Navbar from './components/Navbar'
import Cart from './pages/Cart'

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <nav className="navbar">
            <img src="https://react-projects-15-cocktails.netlify.app/static/media/logo.9a3d2645.svg"></img>
            <Navbar/>
          </nav>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/cocktail/:idDrink" element={<SingleCocktail/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/cart" element={<Cart/>}/>
            <Route exact path="*" element={<Error/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App
