import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
    <header className='bg-[#ff5200] font-serif'>
        <div className='flex justify-between container mx-auto py-8'>
            <img className='w-40 h-12' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png" alt="logo" />
            <div className=' text-white text-base font-bold flex gap-10 items-center'>
                <a target='_blank' href="https://www.swiggy.com/corporate/">Swiggy Corporate</a>
                <a target='_blank' href="https://partner.swiggy.com/login#/swiggy">Partner with us</a>
                <a className='border border-white py-3 px-4 rounded-2xl' target='_blank' href="">Get the App</a>
                <a className='border border-black bg-black py-3 px-4 rounded-2xl' target='_blank' href="">Sign in</a>
            </div>
        </div>
        <div className='relative'>
            <img className='w-90 h-75 absolute top-0 left-0' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"/>
            <img className='w-90 h-75 absolute top-0 right-0' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"/>
            <div className='text-white text-5xl max-w-[60%] font-bold container mx-auto text-center pt-16 pb-8'>
                Order food & groceries. Discover best restaurants.Swiggy it!
            </div>
            <div className='max-w-[70%] container mx-auto flex gap-10 mt-10'>
                <input type='text' className='bg-white w-[40%] text-xl px-6 py-4 rounded-2xl' placeholder='Enter your delivery location'/>
                <input type="text" className='bg-white w-[40%] text-xl px-6 py-4 rounded-2xl' placeholder='Search for resturant,item or more'/>
            </div>
        </div>
        <div className='max-w-[80%] container mx-auto flex'>
            <Link to="/resturant">
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png" alt="" />
            </Link>
            <a href="https://www.swiggy.com/instamart?entryId=1234&entryName=mainTileEntry4&v=1">
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png" alt="" />
            </a>
            <a href="https://www.swiggy.com/dineout">
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png" alt="" />
            </a>
        </div>
    </header>
  )
}

export default Header