import React from 'react'
import Hotelcard from './Hotelcard'
import { roomsDummyData } from '../assets/assets'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const FeaturedDestination = () => {

    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

    <Title title='Featured Destination' subTitle='Discover our hand picked selection of exceptional properties Around The World offering unparalleled luxury and unforgettable experiences'/>

      {/* Replace flex-wrap with grid for card layout */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-20 w-full'>
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <Hotelcard key={room._id} room={room} index={index} />
        ))}
      </div>
      
      <button onClick={() => { navigate('/rooms'); scrollTo(0,0)}}
      className='my-16 px-4 py-2 font-medium text-sm border bg-white border-gray-300 rounded hover:bg-gray-500 transition-all cursor-pointer'>
        View All Destinations
      </button>
    </div>
  )
}

export default FeaturedDestination
