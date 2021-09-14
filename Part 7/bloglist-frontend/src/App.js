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
import { initializeAllUsers } from './reducers/allUsersReducer'
import UsersList from './components/UsersList'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import UserExpanded from './components/UserExpanded'
import PostExpanded from './components/PostExpanded'

const App = () => {
  const dispatch = useDispatch()
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')

  const noteFormRef = useRef()

  useEffect(() => {
    dispatch(initalizeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeAllUsers())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const allUsers = useSelector(state => state.allUsers)

  useEffect(() => {
    dispatch(checkLocalStorage())
  }, [dispatch])

  const match = useRouteMatch('/api/users/:id')
  const userLook = match 
    ? allUsers.find(user => { 
      return user.id === match.params.id
    })
    : null
  console.log(userLook)

  const postMatch = useRouteMatch('/api/blogs/:id')
  const postLook = postMatch
    ? blogs.find(blog => {
      return blog.id === postMatch.params.id
    })
    : null
  console.log(`hello ${postLook}`)

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
      <Switch>
          <Route path='/api/blogs/:id'>
            {user === null ?
            <LoginForm /> :
              <div>
                <h1>blogs</h1>
                <Notification />
                <p>{user.name} logged-in</p> 
              </div>}
            <PostExpanded post={postLook} />
          </Route>
          <Route path='/api/blogs'>
          {user === null ?
            <LoginForm /> :
            <div>
              <h1>blogs</h1>
              <Notification />
              <p>{user.name} logged-in</p>
              
                {allUsers !== null && <UsersList allUsers={allUsers} />}
              
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
          </Route>
          <Route path='/api/users/:id'>
            {user === null ?
              <LoginForm /> :
              <div>
                <h1>blogs</h1>
                <Notification />
                <p>{user.name} logged-in</p> 
              </div>}
              <UserExpanded user={userLook} />
          </Route>
      </Switch>
    </div>
  )
}

export default App