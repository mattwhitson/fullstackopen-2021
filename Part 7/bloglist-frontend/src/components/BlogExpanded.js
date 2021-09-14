import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'


const BlogExpanded = ({post}) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const addLike = () => {
    const newObj = { ...post, likes : post.likes + 1 }
    try {
      dispatch(updateBlog(newObj))
      dispatch(setNotification(`The blog titled ${newObj.title} has successfully been updated`, '', 5))
    } catch {
      dispatch(setNotification('ERROR: The blog post could not be updated. Please try again later', 'error', 5))
    }
  }

  const removePost = () => {
    if(window.confirm('Do you really want to delete this post?')) {
      try {
        console.log(`post ${post}`)
        dispatch(deleteBlog(post.id))
        dispatch(setNotification(`The blog titled ${post.title} has successfully been removed`, '', 5))
        
      }
      catch(exception) {
        console.log(exception)
        dispatch(setNotification('ERROR: You are not authorized to remove this blog', 'error', 5))
      }
    }
  }

  return(
    <div style={blogStyle} className="post">
      <div style={hideWhenVisible} className="infoHidden">
        <Link to={`/api/blogs/${post.id}`}>{`${post.title}`}&nbsp;&nbsp;&nbsp;{`By: ${post.author}`}&nbsp;&nbsp;&nbsp;</Link>
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible} className="infoVisible">
        <p className="postTitle">{post.title}
          <button onClick={toggleVisibility}>Hide</button>
        </p>
        <p>{post.url}</p>
        <p className="likes">Likes: {post.likes}
          <button onClick={addLike}>Like</button></p>
        <p>{post.author}</p>
        <button onClick={removePost} >Remove</button>
      </div>
    </div>

  )

}

BlogExpanded.displayName = 'BlogExpanded'

export default BlogExpanded