import React from 'react'

const DineCard = ({restdata}) => {
  return (
    <div className='max-w-sm flex-none mb-20'>
       <a target='_blank' href={restdata?.cta?.link}>
          <div className='relative'>
            <img className='w-100 h-55 object-fill' src={"https://media-assets.swiggy.com/swiggy/image/upload/"+restdata?.info?.mediaFiles[0]?.url} alt="" />
            <p className='absolute bottom-2 left-2 text-xl text-white z-1'>{restdata.info.name}</p>
            <p className='absolute bottom-2 right-2 text-xl text-white z-1'>{restdata.info.rating.value}</p>
            <div className='absolute bg-linear-to-t from-black from-10% to-transparent h-7 bottom-0 left-0 right-0'></div>
         </div>
       </a>
    </div>
  )
}

export default DineCard