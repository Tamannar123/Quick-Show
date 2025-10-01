import React, { useState, useRef } from 'react';
import BlurCircle from './BlurCircle';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const scrollRef = useRef(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast('Please select a date');
    }
    navigate(`/movies/${id}/${selected}`);
    window.scrollTo(0, 0);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 100;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div id='dateSelect' className='pt-28'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle top='100px' right='0' />

        <div className='flex-1'>
          <p className='text-lg font-semibold'>Choose Date</p>
          <div className='flex items-center gap-2 mt-5'>
            <button onClick={() => scroll('left')}>
              <ChevronLeftIcon width={28} />
            </button>

            <div
              ref={scrollRef}
              className='flex gap-4 overflow-x-auto scrollbar-hide'
            >
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelected(date)}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${
                    selected === date
                      ? 'bg-primary text-white'
                      : 'border border-primary/70'
                  }`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                    })}
                  </span>
                </button>
              ))}
            </div>

            <button onClick={() => scroll('right')}>
              <ChevronRightIcon width={28} />
            </button>
          </div>
        </div>

        <button
          onClick={onBookHandler}
          className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;