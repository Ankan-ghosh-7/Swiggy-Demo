import React, { useEffect, useState } from 'react'
import DineCard from './DineCard'

export const DineOption = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDineout = async () => {
      try {
        const res = await fetch('/api/dineout')
        if (!res.ok) throw new Error('Failed to fetch dineout')
        const json = await res.json()
        setRestaurants(json?.data?.restaurants || [])
      } catch (err) {
        console.error('DineOption fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDineout()
  }, [])

  if (loading) return <div className='w-[80%] mx-auto mt-20 text-gray-400'>Loading dineout restaurants...</div>

  return (
    <div className='w-[80%] mx-auto mt-20'>
        <h1 className='text-2xl font-bold'>Discover best restaurants on Dineout</h1>
        <div className='flex flex-nowrap overflow-x-auto mt-5 gap-4'>
            {
                restaurants.map((restdata) => <DineCard key={restdata?.info?.id} restdata={restdata} />)
            }
        </div>
    </div>
  )
}
