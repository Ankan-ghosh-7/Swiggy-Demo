import React, { useEffect, useState } from 'react'
import { GroceryGridCards } from '../Utils/GroceryData'
import GroceryData from './GroceryData'

const GroceryOption = () => {
  const [groceryItems, setGroceryItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGrocery = async () => {
      try {
        const res = await fetch('/api/instamart')
        if (!res.ok) throw new Error('API failed')
        const json = await res.json()
        const products = json?.data?.products || []
        if (products.length > 0) {
          // Convert API products to match existing component format
          const items = products.map(p => ({
            id: p.id,
            imageId: p.imageId,
            action: { link: 'https://www.swiggy.com/instamart', text: p.displayName },
            description: p.brandName
          }))
          setGroceryItems(items)
        } else {
          // Fallback: Instamart API is protected, use existing data
          setGroceryItems(GroceryGridCards)
        }
      } catch (err) {
        console.warn('Instamart API unavailable, using cached data:', err.message)
        setGroceryItems(GroceryGridCards)
      } finally {
        setLoading(false)
      }
    }
    fetchGrocery()
  }, [])

  if (loading) return <div className='w-[80%] container mx-auto mt-20 text-gray-400'>Loading groceries...</div>

  return (
    <div className='mt-20 w-[80%] container mx-auto'>
        <h1>Shop groceries on Instamart</h1>
       <div className='w-[80%] container mx-auto flex flex-wrap mt-20 gap-3'>
          {
            groceryItems.map((groceriesdata) => <GroceryData key={groceriesdata.id} groceriesdata={groceriesdata} />)
          }
       </div>
    </div>
  )
}

export default GroceryOption