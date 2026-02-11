import React from 'react'

const FoodData = ({fooddata}) => {
  return (
    <div>
        <a href={fooddata.action.link}>
            <img className='w-40 h-50 object-cover' src={"https://media-assets.swiggy.com/swiggy/image/upload/"+fooddata?.imageId}/>
        </a>
    </div>
  )
}

export default FoodData