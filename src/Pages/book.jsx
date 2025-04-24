import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UseAppContext } from '../storeContext';
import axios from 'axios';
import { FaBeer, FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const book = () => {
  const { id } = useParams();
  const { events, sucess, setSuccess, error, setError, info } = UseAppContext();
  const [counter, setCounter] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  console.log(info?.user?.id)
  console.log(id);

  const event = events.find((env) => env.id.toString() === id)

  const handleClick = () => {
   setCounter(prevCounter => {
    const newCounter = prevCounter + 1
    setPrice(newCounter * 2)
    return newCounter;
   });

  }

  const handleSpeak = () => {
    setCounter(prevCounter => {
      const newCounter = Math.max(prevCounter - 1, 0);
      setPrice(newCounter * 2);
      return newCounter;
  })}

  const formData = {
    event_id: id,
    user_id: info?.user.id,
    quantity: counter
  }

  const handleClick2 = () => {
    const postData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/buyTicket', formData);
        console.log(formData)
        if(response.status === 200) {
          alert('Data insertion SUccessful')
          setSuccess(true);
          setError(false)
          navigate('/cart')
        } else {
          setSuccess(false);
          setError(true);
        }
      } catch (error) {
        console.log('There was an errpr posting the data')
      }
    }
    postData()
  }

  if (!event) return <h2>Event not found</h2>;
  return (
    <div className='flex w-200 bg-transparent shadow-md ml-40 mt-30'>
    <div className='flex-col mr-4 '>
        <img src={`http://localhost:5000/uploads/${event.img}`} alt={event.name} width={300} />
        </div>
      <div className='flex-col mt-4'>
      <h3>{event.date}</h3>
      <p>{event.description}</p>
      <div className='ml-16 flex gap-10'>
      <FaPlusCircle className='cursor-pointer' onClick={handleClick} />
      <FaMinusCircle className='cursor-pointer' onClick={handleSpeak} />
      </div>
      <div className='ml-16 flex gap-10'>
      <h3>{counter}</h3>
      <h3>${price}</h3>
      </div>
      <button className='text-red-500 w-32 bg-cyan-500 mb-8 p-1' onClick={handleClick2}>Add to Cart</button>
      </div>
    </div>
  )
}

export default book