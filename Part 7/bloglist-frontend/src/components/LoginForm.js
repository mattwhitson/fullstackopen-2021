import React, { useState } from 'react'
import { logIn } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import Notification from './Notification'




const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logIn(username, password))
  }

  return (
    <>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password" 
            name="password" 
            value={password}  
            onChange={({target}) => setPassword(target.value)}     
          />
        </div>
        <button type="submit" className="login-button">login</button>
      </form>
    </>
  )
}




export default LoginForm