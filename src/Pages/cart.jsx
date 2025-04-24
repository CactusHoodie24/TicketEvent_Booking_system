import React, {useState, useEffect } from 'react';
import { UseAppContext } from '../storeContext';
import useFetchCartStatus from '../useFetch';
import { useNavigate, useParams } from 'react-router-dom';

const Cart = () => {
  const { info } = UseAppContext();
  const { tic } = useFetchCartStatus();

  const user_id = tic?.user?.user_id;
  const[wad,setWad] = useState([]);



  useEffect(() => {
    if (!user_id) return;
    const fetchData = async () => {

      try {
        const response = await fetch(`http://localhost:5000/event/${user_id}`);
        const data = await response.json();
        console.log('Event Data:', data.details);
        setWad(data.details)
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    };

    fetchData(); 
  }, [user_id]); 

  return (
    <div className="flex flex-wrap gap-4">
    {wad.map((wa, index) => (
      <div
        key={index}
        className="w-[200px] bg-cyan-500 p-4 text-white rounded shadow"
      >
        <h3 className="font-semibold text-lg">{wa.name}</h3>
        <h3 className="text-sm">{wa.description}</h3>
        <h3 className="text-sm font-medium">${wa.quantity * 2}</h3>
        <button className="mt-2 border rounded w-full h-8 cursor-pointer hover:bg-red-300 bg-white text-black">
          Stripe Pay
        </button>
      </div>
    ))}
  </div>
  );
};

export default Cart;
