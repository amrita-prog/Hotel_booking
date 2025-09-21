import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { roomsDummyData } from '../assets/assets'

const RoomDetails = () => {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [mainImage, setMainImage] = useState(null)

  useEffect(() => {
    const foundRoom = roomsDummyData.find(r => r._id === id)
    if (foundRoom) {
      setRoom(foundRoom)
      setMainImage(foundRoom.images?.[0] || null)
    }
  }, [id])


  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col md:flex-row gap-2 items-start md:items-center'>
        <h1 className='text-3xl md:text-4xl font-playfair'>
          {room.hotel.name}
          <span className='font-inner text-sm'>({room.roomType})</span>
        </h1>
        <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>
          20% OFF
        </p>
      </div>
    </div>
  )
}

export default RoomDetails
