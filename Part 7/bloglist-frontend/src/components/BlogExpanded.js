import React, { useState } from 'react'


const BlogExpanded = (props) => {
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
    <div style={blogStyle} className="post">
      <div style={hideWhenVisible} className="infoHidden">
        {`${post.title}`}&nbsp;&nbsp;&nbsp;{`By: ${post.author}`}&nbsp;&nbsp;&nbsp;
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