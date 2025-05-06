import { useState, useEffect } from 'react';
import { UseAppContext } from '../storeContext/storeContext';

const useFetchCartStatus = () => {
  const [cart, setCart] = useState(false);
  const [tic, setTic] = useState(null);
  const { info } = UseAppContext();

  useEffect(() => {
    const id = info?.user?.id;
    if (!id) return;

    const fetchCartStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/shoppingCart/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Cart Data:', data);
          setCart(true);
          setTic(data)
        } else {
          setCart(false);
        }
      } catch (error) {
        console.error('There is an error bruv:', error);
        setCart(false); // fallback in case of fetch failure
      }
    };

    fetchCartStatus();
  }, [info?.user?.id]);

  return { cart, tic };
};

export default useFetchCartStatus;
