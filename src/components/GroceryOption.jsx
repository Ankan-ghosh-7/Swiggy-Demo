import React from 'react'
import { GroceryGridCards } from '../Utils/GroceryData'
import GroceryData from './GroceryData'
const GroceryOption = () => {
  return (
    <div className='mt-20 w-[80%] container mx-auto'>
        <h1>Shop groceries on Instamart</h1>
       <div className='w-[80%] container mx-auto flex flex-wrap mt-20 gap-3'>
          {
            GroceryGridCards.map((groceriesdata)=><GroceryData key={groceriesdata.id} groceriesdata={groceriesdata}></GroceryData>)
          }
       </div>
    </div>
  )
}

export default GroceryOption