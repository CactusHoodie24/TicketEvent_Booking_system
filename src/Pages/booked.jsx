import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../components/storeContext/storeContext'
import axios from 'axios';


const booked = () => {
    const {info} = UseAppContext();
    const [weed, setWeed] = useState([])
     useEffect(() => {
        if(!info?.user?.id) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getTicket/${info?.user?.id}`)
                if(response.status === 200) {
                    console.log(response.data.result);
                    setWeed(response.data.result)
                } else {
                    console.log('There is an error');
                }  
            } catch (error) {
                console.log('There is another error getting the data');
            }
        
        }
        fetchData()
     }, [info?.user?.id])

  return (
    <div>
     {weed.map((wee) => {
        return(
            <h1>{wee.quantity}</h1>
        )
     })}

    </div>
  )
}

export default booked