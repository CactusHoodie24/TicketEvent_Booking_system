import React, { useEffect, useState } from 'react'
import Register from './Register'
import { UseAppContext } from '../components/storeContext/storeContext'
import Event from '../Pages/events'

const Home = () => {
 const {isClicked, setIsCliked, info} = UseAppContext();
  
useEffect(() => {
    if(info.length === 0) {
        alert('You are not logged, login to perform some operations')
    }
}, [info])

const shouldShowButton = info.length !== 0;

    const handleClick =() => {
      setIsCliked(true);
    }
  return (
    <div className='relative'>
    <main className="flex flex-col min-h-screen">
    <div className='flex justify-between w-[80%] fixed top-0 z-1000'>
    <div>
    <img src='../../public/1241.png' className='w-32' />
    </div>
    <div>
    <ul className='flex mt-8 gap-10'>
        <li className='btn'>Home</li>
        <li className='btn'>Home</li>
        <li className='btn'>Home</li>
        <li className='btn'>Home</li>
    </ul>
    </div>
    <div className='mt-8'>
        <button onClick={handleClick} className='w-20 h-[30px] bg-transparent border rounded-full hover:border-orange-500 cursor-pointer'>Login</button>
    </div>
 
    </div>
    <section className='mt-10'>
    <Event shouldShowButton={shouldShowButton} />
    </section>
     </main>
     {isClicked && (
    <div className="fixed inset-0 bg-sky-100 bg-opacity-30 transition-opacity duration-300 z-40"></div>
  )}
  {isClicked && (
    <div className="absolute top-16 left-56 z-50">
      <Register />
    </div>
  )}
     </div>
  )
}

export default Home