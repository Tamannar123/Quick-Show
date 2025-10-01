// src/Pages/MyBookings.jsx
import React, { useEffect, useState } from 'react'
import { dummyBookingData, assets } from '../assets/assets'
import BlurCircle from '../Components/BlurCircle'
import isoTimeFormat from '../Lib/isoTimeFormat'
// import Loading from '../Components/Loading'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch bookings (dummy data here)
  const getMyBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getMyBookings()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Loading...
      </div>
    )
  }

  // No bookings
  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No bookings available.
      </div>
    )
  }

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-[120px] md:pt-[160px] min-h-[80vh]">
      {/* Background blur circles */}
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />

      <h1 className="text-lg font-semibold mb-6">MY BOOKINGS</h1>

      <div className="flex flex-col gap-6">
        {bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-3xl shadow-sm"
          >
            {/* Movie poster */}
            <img
              src={item.show.movie.poster_path || assets.placeholderImage}
              alt={item.show.movie.title || 'Movie Poster'}
              className="md:max-w-[180px] aspect-video h-auto object-cover object-bottom rounded"
            />

            {/* Booking details */}
            <div className="flex flex-col p-4 flex-1">
              <p className="text-lg font-semibold">
                {item.show.movie.title || 'Unknown Movie'}
              </p>
              <p className="text-gray-400 text-sm">
                Duration: {item.show.movie.runtime || 'N/A'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Show Time:{' '}
                {item.show.showDateTime
                  ? isoTimeFormat(item.show.showDateTime)
                  : 'Not Available'}
              </p>

              {/* Right-aligned section */}
              <div className="flex flex-col md:items-end md:text-right mt-4">
                {/* Price */}
                <p className="text-2xl font-semibold mb-2">
                  {currency}{item.amount || item.show.price}
                </p>

                {/* Pay Now button */}
                {!item.isPaid && (
                  <button className="mb-3 px-4 py-1 rounded bg-primary text-white text-sm hover:bg-primary/80 transition w-fit">
                    Pay Now
                  </button>
                )}

                {/* Tickets & Seats */}
                <div className="text-sm">
                  <p>
                    <span className="text-gray-400">Total Tickets:</span>{' '}
                    {item.bookedSeats?.length || 0}
                  </p>
                  <p>
                    <span className="text-gray-400">Seat Number:</span>{' '}
                    {item.bookedSeats?.join(', ') || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings
