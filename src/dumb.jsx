import React from 'react'
import { UseAppContext } from './storeContext'
import { Navigate } from 'react-router-dom'

const dumb = () => {
  const {info, setInfo, sucess} = UseAppContext();
  const message = info?.message;
  const username = info?.user?.username;
  const role = info?.user?.role;

  const logout = () => {
    localStorage.removeItem('token')
  }



   
  return (
    <div>
     <button style={{cursor: 'pointer', width: 200, height: 20, backgroundColor: 'gray'}} onClick={logout}>Logout</button>
    </div>
  )
}

export default dumb