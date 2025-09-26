import React, { useState, useEffect } from 'react';
import { roomsDummyData, assets, facilityIcons } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const CheckBox = ({ label, selected = false, onChange = () => { } }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="checkbox"
      checked={selected}
      onChange={e => onChange(e.target.checked, label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => { } }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={() => onChange(label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);

  // Mobile check + SSR safe
  useEffect(() => {
    const handleResize = () => {
      setFilterOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const roomTypes = ['Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite'];
  const priceRanges = ['₹ 0 to 500', '₹ 500 to 1000', '₹ 1000 to 2000', '₹ 2000 to 3000'];
  const sortOptions = ['Price Low to High', 'Price High to Low', 'Newest First'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 mt-14 flex flex-col md:flex-row-reverse gap-4">
      {/* Sidebar Filters */}
      <div className="w-full md:w-[350px]">
        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center justify-between border border-gray-300 rounded-t-lg px-5 py-3">
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <span
            className="text-xs font-semibold bg-gray-200 rounded-full px-3 py-1 cursor-pointer"
            onClick={() => setFilterOpen(prev => !prev)}
          >
            {filterOpen ? 'HIDE' : 'SHOW'}
          </span>
        </div>

        {filterOpen && (
          <aside className="bg-white border border-gray-300 rounded-b-lg md:rounded-lg p-7 flex flex-col gap-6 h-fit">
            {/* Desktop Title */}
            <div className="hidden md:flex items-center justify-between pb-3 border-b border-gray-300">
              <p className="text-base font-medium text-gray-800">FILTERS</p>
              <span className="text-xs cursor-pointer text-gray-600 font-semibold">CLEAR</span>
            </div>

            <div>
              <p className="font-semibold text-gray-800 pb-2">Popular filters</p>
              {roomTypes.map(room => (
                <CheckBox key={room} label={room} />
              ))}
            </div>

            <div>
              <p className="font-semibold text-gray-800 pb-2">Price Range</p>
              {priceRanges.map(range => (
                <CheckBox key={range} label={range} />
              ))}
            </div>

            <div>
              <p className="font-semibold text-gray-800 pb-2">Sort By</p>
              {sortOptions.map(option => (
                <RadioButton key={option} label={option} />
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Room List */}
      <div className="flex-1">
        <div className="mb-10">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-2">Hotel Rooms</h1>
          <p className="text-gray-500 text-base max-w-xl">
            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {roomsDummyData.map(room => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-center md:items-start gap-8 py-8 border-b border-gray-200 last:border-b-0"
            >
              <img
                src={room.images[0]}
                alt={room.hotel.name}
                title="View Room Details"
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
                }}
                className="w-full md:w-[400px] h-[240px] object-cover rounded-xl shadow-md cursor-pointer transition-transform duration-150 hover:scale-105"
              />

              <div className="flex flex-col justify-start flex-1 gap-2">
                <div className="text-gray-500 text-base">{room.hotel.city}</div>
                <div
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="font-playfair text-2xl md:text-3xl font-semibold text-gray-800 cursor-pointer"
                >
                  {room.hotel.name}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={room.hotel.rating} />
                  <span className="ml-2 text-gray-800 font-medium">200+ reviews</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 mt-1 text-base">
                  <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                  <span>{room.hotel.address}</span>
                </div>

                <div className="flex flex-wrap gap-4 mt-3 items-center">
                  {room.amenities.map(item => (
                    <div
                      key={`${room._id}-${item}`} // unique key fix
                      className="flex items-center gap-2 bg-[#F5F5FF]/70 px-3 py-2 rounded-lg"
                    >
                      <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="text-xl font-medium text-gray-700">
                    ₹{room.pricePerNight} /night
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
