import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { logIn } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import Notification from './Notification'




const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('i am here')
    dispatch(logIn(username, password))

    // dispatch(setNotification('You have successfully logged in', '',  5))
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


// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   setUsername: PropTypes.func.isRequired,
//   setPassword: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired
// }

export default LoginForm