import React, { createContext, useContext, useState, useEffect } from 'react'

const GlobalContext = createContext();


const StoreContext = ({children}) => {
    const [details, setDetails] = useState({
      username: '',
      password: '',
      email: ''
    })
     const [error, setError] = useState(false);
        const [sucess, setSuccess] = useState(false);
        const [info, setInfo] = useState([])
        const [token, setToken] = useState(localStorage.getItem('token'));
        const url = 'http://localhost:5000/events';
        const [events, setEvents] = useState([])
        const [tickets, setTickets] = useState([])
        const [cart, setCart] = useState(false);
        const [isClicked, setIsCliked] = useState(false);
       
    
        useEffect(() => {
            const fetchData = async () => {
               
                console.log(token)
                try {
    
                    if (!token) {
                        console.error("No token found, user must log in.");
                        return;
                    }
    
                    const res = await fetch('http://localhost:5000/api/users/dashboard', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
            
                   
                    if (!res.ok) {
                        throw new Error("Failed to fetch data");
                    }
    
                    const data = await res.json();
                    console.log(data)
                    setInfo(data);
                    setSuccess(true);
                } catch (err) {
                    console.error('There was an error:', err);
                    setError(true);
                }
                
            } 
            const fetchEvents = async () => {
              try {
                const response = await fetch(url)
                const data = await response.json();
                console.log(data.result)
                setEvents(data.result)
              } catch(error) {
                console.log('things did not go accroding to plan', error)
              }
             
            } 
            
            fetchEvents();
            fetchData()
        }, [token])

        
        const logout = () => {
          localStorage.removeItem('token')
          console.log('Clikcing')
          window.location.href = '/';
        }
  return (
    <GlobalContext.Provider value={{details, info, setDetails, sucess, error, setError, setSuccess, logout, setInfo, setToken, events, setEvents, isClicked, setIsCliked}}>
     {children}
    </GlobalContext.Provider>
  )
}


export default StoreContext;

export const UseAppContext = () => useContext(GlobalContext);