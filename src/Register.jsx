import React, { useState } from 'react'
import { UseAppContext } from './storeContext'
import { Navigate, useNavigation, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Register = () => {
    const { details, setDetails, error, setError, sucess, setSuccess, setInfo, setToken} = UseAppContext();
    const navigate = useNavigate();
    const [blud, setBlud] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!blud) {
          try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: details.username,
                    password: details.password,
                    email: details.email,
                }),
            });

            const data = await response.json();
            console.log("Response received:", data);
            if (response.ok) {
                setSuccess(true);
                setError(false); // Ensure error is reset
            } else {
                setSuccess(false);
                setError(true);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError(true);
            setSuccess(false);
        }
        } else {
          const fetchTrap = async () => {
            const rep = await fetch('http://localhost:5000/login', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                username: details.username,
                password: details.password
              })
            })
            const data = await rep.json();
            console.log("Response received:", data);
            if(rep.ok) {
              localStorage.setItem('token', data.token);
              setError(false)
              setInfo(data)
              setToken(data.token); // trigger re-fetch in context
              const decoded = jwtDecode(data.token);
  console.log('Decoded:', decoded); // see what’s in there (like role)

  // ✅ Redirect based on role
  if (decoded.role === 'admin') {
    navigate('/event');
  } else if (decoded.role === 'user') {
    navigate('/ticket');
  } else {
    navigate('/unauthorized');
  }

              setSuccess(true);

            } else {
              setError(true);
              setSuccess(false)
            }
            
          }
          fetchTrap()
        }
        
    };

    const handleClick = () => {
      if(!blud){
       setBlud(true);
      }
      else {
        setBlud(false);
      }
    }

    return (
        <div>
            <form className='form-container' onSubmit={handleSubmit}>
                {error ? (
                    <h1>There was an error my guy</h1>
                ) : sucess ? (
                    <h1>This was a success</h1>
                ) : null}
                
                {!blud ? <h3>Sign Up</h3> : <h3>Login</h3> }
                <input
                    type='text'
                    placeholder='username'
                    name='username'
                    value={details.username}
                    onChange={(e) => setDetails({ ...details, username: e.target.value })}
                />
                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    value={details.password}
                    onChange={(e) => setDetails({ ...details, password: e.target.value })}
                />
                {!blud && <input
                    type='text'
                    placeholder='email'
                    name='email'
                    value={details.email}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                />}
                <button type='submit'>Submit</button>
                <label onClick={handleClick}>{blud ? 'Register' : 'Login' || !blud && 'Register'}</label>
            </form>
        </div>
    );
};

export default Register;
