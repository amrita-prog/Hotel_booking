import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { roomsDummyData, assets, facilityIcons, roomCommonData } from '../assets/assets';
import StarRating from '../components/StarRating';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const foundRoom = roomsDummyData.find(r => String(r._id) === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images?.[0] || null);
    }
  }, [id]);

  if (!room) {
    return <p className="py-28 text-center text-gray-500">Room not found.</p>;
  }

  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Title */}
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel.name}{' '}
          <span className="font-inter text-sm">({room.roomType})</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>

      {/* Rating + reviews */}
      <div className="flex items-center mt-2 gap-3">
        <StarRating rating={room.hotel.rating} />
        <span className="text-sm text-gray-700 font-medium">200+ reviews</span>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 mt-2 text-gray-500">
        <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
        <span>{room.hotel.address}</span>
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage}
            alt="main-room-image"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room?.images?.length > 1 &&
            room.images.map((image, index) => (
              <img
                key={`${room._id}-thumb-${index}`}
                onClick={() => setMainImage(image)}
                src={image}
                alt={`room-image-${index}`}
                className={`w-full shadow-md rounded-xl object-cover cursor-pointer ${mainImage === image ? 'outline outline-4 outline-orange-400' : ''
                  }`}
              />
            ))}
        </div>
      </div>

      {/* Highlights & amenities */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">
            Experience Luxury Like Never Before
          </h2>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {Array.isArray(room.amenities) &&
              room.amenities.map((item, idx) => (
                <div
                  key={`${room._id}-${item}-${idx}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 shadow-sm"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5 object-contain"
                  />
                  <p className="text-xs text-gray-700 select-none">{item}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Price */}
        <div className="mt-6 md:mt-0">
          <p className="text-3xl font-bold">₹{room.pricePerNight}/night</p>
        </div>
      </div>
      {/* check-in check-out */}
      <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
        <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
          <div className='flex flex-col'>
            <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
            <input type="date" id='checkInDate' placeholder='Check-In'
              className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
            <input type="date" id='checkOutDate' placeholder='Check-out'
              className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="guests" className='font-medium'>Guests</label>
            <input type="number" id='guests' placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
          </div>

        </div>

        <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
          Check Availability
        </button>

      </form>

      {/* comment specification */}
      <div className='mt-25 space-y-4'>
        {roomCommonData.map((spec, index) => (
          <div key={index} className='flex items-start gap-2'>
            <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
            <div>
              <p className='text-base'>{spec.title}</p>
              <p className='text-gray-500'>{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
        <p>
          Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.
        </p>
      </div>

      {/* Hosted by */}
      <div className='flex flex-col items-start gap-4'>
        <div className='flex gap-4'>
          <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
          <div>
            <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
            <div className='flex items-center mt-1'>
              <StarRating />
              <p className='ml-2'>200+ reviews</p>
            </div>
          </div>
        </div>
        <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>
          Contact Now
        </button>
      </div>


    </div>
  );
};

export default RoomDetails;
