import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../components/storeContext/storeContext'
import '../index.css'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const ticket = () => {
    const {error, setError, setSuccess, sucess,logout, info} = UseAppContext()
    const [details, setDetails] = useState({
        name: '',
        description: '',
        date: '',
        price: '',
    })
    const [gat, setGat] = useState(false)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault();

        if(!details.name || !details.date || !details.description || !details.price){
          return alert('Complete every field to submit')
        }

        if(details.price > 100){
          return setGat(true);
        } 

        const fetchData = async () => {
            const formData = new FormData();
            formData.append('image', file)

            const jsonData = {
                name: details.name,
                description: details.description,
                date: details.date,
                price: details.price
            }
            formData.append('data', JSON.stringify(jsonData))
            try {
                const response = await axios.post('http://localhost:5000/ticket', formData)
        
                if(response.status !== 200) {
                  setSuccess(false);
                  setError(true);
                } else {
                    setSuccess(true)
                    setError(false)
                    setDetails({
                        name: '',
                        description: '',
                        date: '',
                        price: ''
                      });
                      setFile('');
                }
                
            } catch (error) {
                console.log('Failed to send the data', error)
            }
        }
        fetchData()
    }




    if(error) {
        return <h1 className='error'>There is an error posting the data</h1>
    } 

  return (
    <div>
    <button onClick={logout}>Logout</button>
    {gat ? <h1 className='error'>Only 100 tickets are available</h1> : ''}
    {sucess && <h1 className='error'>Insertion successful</h1>}
    <form className='form-container' onSubmit={handleSubmit}>
        <input type='text' placeholder='name' id='name' name='name' value={details.name} onChange={(e) => setDetails({...details, name: e.target.value})} />
        <input type='text' placeholder='description' id='description' name='description' value={details.description} onChange={(e) => setDetails({...details, description: e.target.value})} />
        <input type='date' id='date' name='date' placeholder='date' value={details.date} onChange={(e) => setDetails({...details, date: e.target.value})} />
        <input type='number' id='price' name='price' placeholder='price' value={details.price} onChange={(e) => setDetails({...details, price: e.target.value})} />
        <input type='file' accept='/*' onChange={(e) => setFile(e.target.files[0])}  />
        <button type='submit'>Submit</button>
        </form>
        
    </div>
  )
}

export default ticket