import React from 'react'

const BlogForm = ({message, user, addPost, handleTitleChange, handleNameChange, handleUrlChange}) => (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addPost}>
        <div>
          Title: <input onChange={handleTitleChange} />
        </div>
        <div>
          Author: <input onChange={handleNameChange} />
        </div>
        <div>
          URL: <input onChange={handleUrlChange} />
        </div>
        <button onSubmit={addPost}>Add</button>
      </form>
    </div>
  )

export default BlogForm