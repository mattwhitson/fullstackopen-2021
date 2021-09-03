import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogExpanded from './components/BlogExpanded'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
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
      setMessage(`You have successfully logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      console.log(user)
      setMessage('ERROR: Wrong credentials')
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
    noteFormRef.current.toggleVisibility()
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
  
  const blogForm = () => {
    return(
      <div>
        <h1>blogs</h1>
        <Notification message={message} />
        <p>{user.name} logged-in</p>
        <Togglable buttonLabel='Create New Note' ref={noteFormRef}>

          <BlogForm addPost={addPost} 
            handleTitleChange={({target}) => setTitle(target.value)}
            handleNameChange={({target}) => setName(target.value)}
            handleUrlChange={({target}) => setUrl(target.value)} />

        </Togglable>
       
      </div>
    )
  }

  const updateBlog = async (newObj) => {
    try {
    const updatedPost = await blogService
      .update(newObj)

    setBlogs(blogs.map(blog => blog.id !== updatedPost.id ? blog : updatedPost))
    setMessage(`The blog titled ${updatedPost.title} has successfully been updated`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

  } catch(exception) {
    setMessage(`ERROR: The blog post could not be updated. Please try again later`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }
}

  const removeBlog = async (post) => {
    try {
      await blogService
        .remove(post.id)

      setBlogs(blogs.filter(blog => blog.id !== post.id))
      setMessage(`The blog titled ${post.title} has successfully been removed`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } 
    catch {
      setMessage(`ERROR: You are not authorized to remove this blog`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }



  return (
    <div>
        {user === null ?
          loginForm() :
          blogForm()
         }
      <br></br>
      {user !== null && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <BlogExpanded key={blog.id} post={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
      )}
    </div>
  )
}

export default App