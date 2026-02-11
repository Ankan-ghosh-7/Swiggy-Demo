import React, { useEffect, useState } from 'react'
import FoodData from './FoodData'

const FoodOption = () => {
  const [foodItems, setFoodItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFoodCategories = async () => {
      try {
        const res = await fetch('/api/restaurants?lat=22.5726&lng=88.3639')
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        const cards = json?.data?.cards || []
        
        // Find the "What's on your mind?" card (ImageInfoLayoutCard type)
        for (const card of cards) {
          const cardData = card?.card?.card
          const styleType = cardData?.gridElements?.infoWithStyle?.['@type'] || ''
          if (styleType.includes('ImageInfoLayoutCard')) {
            setFoodItems(cardData.gridElements.infoWithStyle.info || [])
            break
          }
        }
      } catch (err) {
        console.error('FoodOption fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFoodCategories()
  }, [])

  if (loading) return <div className='w-[80%] container mx-auto mt-20 text-gray-400'>Loading food categories...</div>

  return (
    <>
       <div className='w-[80%] container mx-auto flex flex-wrap mt-20 gap-3'>
          {
            foodItems.map((fooddata) => <FoodData key={fooddata.id} fooddata={fooddata} />)
          }
       </div>
    </>
  )
}

export default FoodOption