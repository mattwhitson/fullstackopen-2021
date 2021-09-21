
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Login from './components/Login'  
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client'


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>

        {!token && 
          <button onClick={() => setPage('login')}>Login</button>}
        {token && 
        <>
          <button onClick={() => setPage('add')}>Add book</button>
          <button onClick={() => setPage('recommend')}>Recommendations</button>
          <button onClick={logout}>Logout</button>
        </>}

      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />
      
      <Login
      show={page === 'login'}
      notify={notify}
      errorMessage={errorMessage}
      setToken={setToken}
      />

      <Recommendations 
      show={page === 'recommend'}
      />


    </div>
  )
}

export default App