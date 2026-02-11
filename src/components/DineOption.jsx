import React from 'react'
import {dineoutRestaurants} from '../Utils/DineData'
import DineCard from './DineCard'
export const DineOption = () => {
  return (
    <div className='w-[80%] mx-auto mt-20'>
        <h1 className='text-2xl font-bold'>Discover best resturants on Dineout</h1>
        <div className='flex flex-nowrap overflow-x-auto mt-5 gap-4'>
            {
                dineoutRestaurants.map((restdata)=><DineCard key={restdata?.info?.id} restdata={restdata}></DineCard>)
            }
        </div>
    </div>
  )
}
