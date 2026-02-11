import React from 'react'
import Header from './Header'
import FoodOption from './FoodOption'
import GroceryOption from './GroceryOption'
import { DineOption } from './DineOption'

const Home = () => {
  return (
    <div>
        <Header/>
        <FoodOption/>
        <GroceryOption/>
        <DineOption/>
    </div>
  )
}

export default Home