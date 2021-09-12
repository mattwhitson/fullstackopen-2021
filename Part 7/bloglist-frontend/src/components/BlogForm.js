import React from 'react'

const BlogForm = ({ addPost, handleTitleChange, handleNameChange, handleUrlChange }) => (
  <div className="formDiv">
    <h2>Create New</h2>
    <form  onSubmit={addPost}>
      <div>
          Title: <input className="title" onChange={handleTitleChange} />
      </div>
      <div>
          Author: <input className="author" onChange={handleNameChange} />
      </div>
      <div>
          URL: <input className="url" onChange={handleUrlChange} />
      </div>
      <button onSubmit={addPost}>Add</button>
    </form>
  </div>
)

export default BlogForm