import React, { useState, useEffect, useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogExpanded from './components/BlogExpanded'
import LoginForm from './components/LoginForm'
import { setNotification } from './reducers/notificationReducer'
import { addBlog, initalizeBlogs } from './reducers/blogReducer'
import { checkLocalStorage } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')

  const noteFormRef = useRef()

  useEffect(() => {
    dispatch(initalizeBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(checkLocalStorage())
  }, [])

  const addPost = (event) => {
    event.preventDefault()

    const newPost = {
      title: title,
      author: name,
      url: url,
      likes: 0
    }
    noteFormRef.current.toggleVisibility()

    dispatch(addBlog(newPost))

    setName('')
    setTitle('')
    setUrl('')
  

    dispatch(setNotification(`${user.name} has posted a new blog titled ${newPost.title}`, '', 5))
    
  }


  return (
    <div>
      {user === null ?
        <LoginForm /> :
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
        <BlogExpanded key={blog.id} post={blog}/>
      )}
    </div>
  )
}

export default App