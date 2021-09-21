import React, { useState } from 'react'
import LoginForm from './LoginForm'
import Notify from './Notify'

const Login = ({ notify, errorMessage, show, setToken }) => {
    
    if(!show) {
        return null
    }

    return (
        <div>
          <Notify errorMessage={errorMessage} />
          <h2>Login</h2>
          <LoginForm
            setToken={setToken}
            setError={notify}
          />
        </div>
      )
}

export default Login