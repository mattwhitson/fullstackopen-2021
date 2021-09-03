import React, { useState } from 'react'


const BlogExpanded = React.forwardRef((props, ref) => {
  const post = props.post

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
    props.updateBlog(newObj)
  }

  const removePost = () => {
    if(window.confirm('Do you really want to delete this post?')) {
      props.removeBlog(post)
    }
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {`${post.title}`}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        <p>{post.title}
          <button onClick={toggleVisibility}>Hide</button>
        </p>
        <p>{post.url}</p>
        <p>Likes: {post.likes}
          <button onClick={addLike}>Like</button></p>
        <p>{post.author}</p>
        <button onClick={removePost} >Remove</button>
      </div>
    </div>

  )

})

BlogExpanded.displayName = 'BlogExpanded'

export default BlogExpanded