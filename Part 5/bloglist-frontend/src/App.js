import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userCredentials = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(userCredentials)
      ) 
      blogService.setToken(userCredentials.token)
      console.log(userCredentials)
      setUser(userCredentials)
      setUsername('')
      setPassword('')
      setMessage(`You have successfully logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      console.log(user)
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addPost = (event) => {
    event.preventDefault()

    const newPost = {
      title: title,
      author: name,
      url: url,
      likes: 0
    }

    blogService
      .create(newPost)
      .then(response => {
        setBlogs(blogs.concat(newPost))
        setName('')
        setTitle('')
        setUrl('')
      })

    setMessage(`${user.name} has posted a new blog titled ${newPost.title}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }


  const loginForm = () => (
    <div>
      <h1>Please Login</h1>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
  )
  
  const blogForm = () => (
    <div>
      <h1>blogs</h1>
      <Notification message={message} />
      <p>{user.name} logged-in</p>
      <h2>Create New</h2>
      <form onSubmit={addPost}>
        <div>
          Title: <input onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          Author: <input onChange={({target}) => setName(target.value)} />
        </div>
        <div>
          URL: <input onChange={({target}) => setUrl(target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )



  return (
    <div>
        {user === null ?
          loginForm() :
          blogForm()
         }
      <br></br>
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App