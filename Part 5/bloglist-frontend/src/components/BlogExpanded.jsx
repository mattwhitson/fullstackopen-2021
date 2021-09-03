import React, { useState } from 'react'


const BlogExpanded = React.forwardRef((props, ref) => {
  const post = props.post

  const [visible, setVisible] = useState(false)
  const [virtualPost, setVirtualPost] = useState(post)

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
    

  	const newObj = {...post, likes : post.likes + 1}
  	props.updateBlog(newObj)
    setVirtualPost(newObj)
  }

  return(
  	<div style={blogStyle}>
	  	<div style={hideWhenVisible}>
	  		<p>{virtualPost.title}
	  		<button onClick={toggleVisibility}>View</button>
	  		</p>
	  	</div>
	  	<div style={showWhenVisible}>
	  		<p>{virtualPost.title}
	  		<button onClick={toggleVisibility}>Hide</button>
	  		</p>
	  		<p>{virtualPost.url}</p>
	  		<p>Likes: {virtualPost.likes} 
	  		<button>Like</button></p>
	  		<p>{virtualPost.author}</p>
	  	</div>
  	</div>

  )

})


export default BlogExpanded