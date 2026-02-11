import React from 'react'
import { imageGridCards } from '../utils/FoodData'
import FoodData from './FoodData'
const FoodOption = () => {
  return (
    <>
       <div className='w-[80%] container mx-auto flex flex-wrap mt-20 gap-3'>
          {
            imageGridCards.map((fooddata)=><FoodData key={fooddata.id} fooddata={fooddata}></FoodData>)
          }
       </div>
    </>
  )
}

export default FoodOption