import React from 'react'
import Header from './components/Header'
import FoodOption from './components/FoodOption'
import GroceryOption from './components/GroceryOption'
import { DineOption } from './components/DineOption'
import Resturant from './components/Resturant'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './components/Home'
const App = () => {
  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/resturant' element={<Resturant></Resturant>}></Route>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App