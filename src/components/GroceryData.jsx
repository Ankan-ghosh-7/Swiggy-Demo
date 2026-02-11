import React from 'react'
const GroceryData = ({groceriesdata}) => {
  return (
    <div>
        <a href={groceriesdata.action.link}>
            <img className='w-40 h-50 object-cover' src={"https://media-assets.swiggy.com/swiggy/image/upload/"+groceriesdata?.imageId} alt="" />
            <h1>{groceriesdata.action.text}</h1>
        </a>
    </div>
  )
}

export default GroceryData