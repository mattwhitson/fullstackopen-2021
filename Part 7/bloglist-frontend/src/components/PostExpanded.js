import React from 'react'
import Comment from './Comment'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const PostExpanded = ({ post }) => {
    const dispatch = useDispatch()

    if(!post) {
        return null
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
        <>
            <h1>{post.title}</h1>
            <div>
                {<a href={post.url} target="_blank" rel="noreferrer">{post.url}</a>}
                <p>{post.likes} likes <button onClick={addLike}>Like</button></p>
                <p>Added by {post.author}</p>
            </div>
            <Comment post={post} />
            <Link to="/api/blogs">
                <button onClick={removePost}>Delete Post</button>
            </Link>
        </>
    )
}

export default PostExpanded