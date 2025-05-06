import React, {useState, useEffect } from 'react';
import { UseAppContext } from '../components/storeContext/storeContext';
import useFetchCartStatus from '../components/customHook/useFetch';
import { useNavigate, useParams } from 'react-router-dom';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/stripe/stripe'; // make sure the path is correct

const stripePromise = loadStripe('pk_test_51RHfgO2Xwjwcw40stM5Hn91OWpBuioUfIfgjP3pKUywHxstqiJWiMGDAEQQZViSPsQzx23ScCtbl5JVNRt1uLLHl00W0AthY7b'); // replace with your Stripe key

const Cart = () => {
  const { info } = UseAppContext();
  const { tic } = useFetchCartStatus();

  const user_id = tic?.user?.user_id;
  const ticket_id = tic?.user?.ticket_id;
  const email = info?.user?.email;
  console.log(email);
  const[wad,setWad] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [paidTickets, setPaidTickets] = useState([]);



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

    const fetchInfo = async () => {
        try {
          const response = await fetch(`http://localhost:5000/gettics/${user_id}`);
          const data = await response.json();
      
          const paidTicketIds = data.data.map(item => item.ticket_id); 
          setPaidTickets(paidTicketIds);
        } catch (error) {
          console.error('Error checking ticket payment status:', error);
          setJot(false);
        }
      };
      fetchInfo();
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
        <button disabled={paidTickets.includes(wa.ticket_id)} className={`mt-2 border rounded w-full h-8 cursor-pointer ${
    paidTickets.includes(wa.ticket_id)
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'hover:bg-red-300 bg-white text-black'
  }`} onClick={() => setSelectedItem(wa)}>
        {paidTickets.includes(wa.ticket_id) ? 'Paid' : 'Stripe Pay'}
        </button>
      </div>
    ))}

    {selectedItem && (
        <div className="mt-8 p-6 bg-gray-100 rounded">
          <h2 className="text-lg font-bold mb-2">
            Checkout for: {selectedItem.name}
          </h2>
          {console.log("📦 Selected Item Passed to CheckoutForm:", selectedItem)}
          <Elements stripe={stripePromise}>
            <CheckoutForm item={selectedItem} ticket={ticket_id} email={email} />
          </Elements>
        </div>
      )}
  </div>
  );
};

export default Cart;
