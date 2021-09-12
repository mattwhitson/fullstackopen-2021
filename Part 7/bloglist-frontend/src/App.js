import React, { useState, useEffect, useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogExpanded from './components/BlogExpanded'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

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

      setUser(userCredentials)
      setUsername('')
      setPassword('')

      dispatch(setNotification('You have successfully logged in', '',  5))

    } catch (exception) {
      console.log(exception)
      console.log(user)

      dispatch(setNotification('ERROR: Wrong credentials', 'error', 5))
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
    noteFormRef.current.toggleVisibility()
    blogService
      .create(newPost)
      .then(response => {
        setBlogs(blogs.concat(response))
        setName('')
        setTitle('')
        setUrl('')
      })

    dispatch(setNotification(`${user.name} has posted a new blog titled ${newPost.title}`, '', 5))
    
  }


  const loginForm = () => (
    <div>
      <h1>Please Login</h1>
      <Notification />
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

  const updateBlog = async (newObj) => {
    try {
      const updatedPost = await blogService
        .update(newObj)

      setBlogs(blogs.map(blog => blog.id !== updatedPost.id ? blog : updatedPost))
      dispatch(setNotification(`The blog titled ${updatedPost.title} has successfully been updated`, '', 5))
      

    } catch(exception) {
      dispatch(setNotification('ERROR: The blog post could not be updated. Please try again later', 'error', 5))
      
    }
  }

  const removeBlog = async (post) => {
    try {
      await blogService
        .remove(post.id)

      setBlogs(blogs.filter(blog => blog.id !== post.id))
      dispatch(setNotification(`The blog titled ${post.title} has successfully been removed`, '', 5))
      
    }
    catch(exception) {
      dispatch(setNotification('ERROR: You are not authorized to remove this blog', 'error', 5))
    }
  }



  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h1>blogs</h1>
          <Notification />
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel='Create New Note' ref={noteFormRef}>

            <BlogForm addPost={addPost}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleNameChange={({ target }) => setName(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)} />

          </Togglable>

        </div>}
      <br></br>
      {user !== null && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <BlogExpanded key={blog.id} post={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
      )}
    </div>
  )
}

export default App