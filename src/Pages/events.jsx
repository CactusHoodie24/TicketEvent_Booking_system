import React, { useState, useEffect } from 'react'
import { UseAppContext } from '../storeContext'
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import useFetchCartStatus from '../useFetch'



const events = () => {
    const { events, setEvents, logout, info } = UseAppContext()
    const { cart } = useFetchCartStatus();
    const baseUrl = 'http://localhost:5000/uploads/';
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [newEVent, setNewEvent] = useState(events)
    const [selectedCategories, setSelectedCategories] = useState('all')
    const allCategories = ['all', ...new Set(events.map(event => event.category))]
    const navigate = useNavigate();
    

    const search = (e) => {
        setName(e.target.value)
      const filteredItem = events.filter((event) => event.name.includes(e.target.value
      ))
      setNewEvent(filteredItem)
    }

    const searchDate = (e) => {
        const selectedDate = e.target.value;
        console.log("Selected Date:", selectedDate);
        setDate(selectedDate);
    
        const filteredDate = events.filter((event) => {
            const eventDate = event.date.slice(0, 10); 
            return eventDate === selectedDate;
        });
        setNewEvent(filteredDate);
    
        console.log(filteredDate);
    }

  const filter = (category) => {
    setSelectedCategories(category);
    if (category === 'all') {
      setNewEvent(events);
    } else {
      const filtered = events.filter((event) => event.category === category);
      setNewEvent(filtered);
    }
  };

  const cartColor = cart ? 'bg-blue w-10 ' : 'bg-red';
  console.log(cart)

  return (
    <div className='flex flex-col position: relative;'>
    <div className="relative inline-block">
  <FaShoppingCart className="text-2xl" onClick={() => navigate('/cart')} />
  {cart && (
    <span className="absolute top-0 left-7 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
  )}
</div>
    <button className='border-2 border-solid rounded-sm mr-4 w-20 h-8 cursor-pointer absolute top-1 right-0 size-16 ... bg-cyan-500 text-white' onClick={logout}>Logout</button>
    <div className='flex-row mb-5'>
    <input className='rounded-sm mr-2 w-40' style={{border: '1px solid black'}} type='text' value={name} onChange={search} placeholder='Search by name' ></input>
    <input className='mr-4 rounded w-40' style={{border: '1px solid black'}} type='date' value={date} onChange={searchDate} ></input>
    </div>
    <div className='flex-row ml-32'>
  {allCategories.map((category, index) => {
        return (
          <button className='mr-32 w-20 bg-cyan-500 text-white rounded' key={index} onClick={() => filter(category)}>
            {category}
          </button>
        );
      })}
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {newEVent.map((event) => (
    <div
      key={event.id}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row"
    >
      <img
        src={`${baseUrl}${event.img}`}
        alt={event.name}
        className="w-full sm:w-48 h-48 object-cover"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold mb-2">{event.name}</h1>
          <h3 className="text-gray-500 mb-4">{event.date}</h3>
        </div>
        <Link
          to={`/event/${event.id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  ))}
</div>
    </div>
  )
}

export default events