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
import Navigation from './components/Navigation'
import { Table } from 'react-bootstrap'

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
    <div className="container">
      <Switch>
          <Route path='/api/blogs/:id'>
            {user === null ?
            <LoginForm /> :
            <>
              <div>
                <Navigation user={user} />
                <h1>Blogs App</h1>
                <Notification />
              </div>
            <PostExpanded post={postLook} />
            </>
            }
          </Route>
          <Route path='/api/blogs'>
          {user === null ?
            <LoginForm /> :
            <div>
              <Navigation user={user} />
              <h1>Blogs App</h1>
              <Notification />
              
              <Togglable buttonLabel='Create New Note' ref={noteFormRef}>

                <BlogForm addPost={addPost}
                  handleTitleChange={({ target }) => setTitle(target.value)}
                  handleNameChange={({ target }) => setName(target.value)}
                  handleUrlChange={({ target }) => setUrl(target.value)} />

              </Togglable>

            </div>}
          <br></br>
          <Table striped="true">
            <tbody>
              {user !== null && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <tr key={blog.id}>
                <BlogExpanded key={blog.id} post={blog}/>
              </tr>
              )}
          </tbody>
          </Table>
          </Route>
          <Route path='/api/users/:id'>
            {user === null ?
              <LoginForm /> :
              <div>
                <Navigation user={user} />
                <h1>Blogs App</h1>
                <Notification />
              </div>}
              <UserExpanded user={userLook} />
          </Route>
          <Route path='/api/users'>
              {user === null ?
                <LoginForm /> :
                <div>
                  <Navigation user={user} />
                  <h1>Blogs App</h1>
                  {allUsers !== null && <UsersList allUsers={allUsers} />}
                </div>}
          </Route>
      </Switch>
    </div>
  )
}

export default App