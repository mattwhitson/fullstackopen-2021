import React, { useState, useEffect } from 'react'
import blogService from './services/blog'

function App() {
  const [posts, setPosts] = useState([])
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
      })
  }, [])


  const addPost = (event) => {
    event.preventDefault()

    const newPost = {
      title: title,
      author: name,
      url: url,
      likes: 0
    }

    blogService
      .create(newPost)
      .then(response => {
        setPosts(posts.concat(newPost))
        setName('')
        setTitle('')
        setUrl('')
      })
  }

  const addLike = (id) => {
    const oldPost = posts.find(post => post.id === id)

    const newObj = {...oldPost, likes : oldPost.likes + 1}

    blogService
      .update(id, newObj)

    setPosts(posts.map(post => post.id !== newObj.id ? post : newObj))
  }

  const removePost = (id) => {

    blogService
      .remove(id)
    
    setPosts(posts.filter(post => post.id !== id))
  }


  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setName(event.target.value)
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div class="app">
      <h1>Blog and Co</h1>
      <div>
        {posts.map(post => 
          <div>
            <h2 class="title">{post.title}</h2>
            <a href={post.url}>Blog Link</a>
            <p>By: {post.author} Likes: {post.likes}</p>
            <button onClick={() => addLike(post.id)}>Like</button>
            <button onClick={() => removePost(post.id)}>Delete</button>
          </div>)}
      </div>
      <h1>Create A New Blog Post</h1>
      <form onSubmit={addPost}>
        <div>
          Title: <input onChange={handleTitle} />
        </div>
        <div>
          Author: <input onChange={handleAuthor} />
        </div>
        <div>
          URL: <input onChange={handleUrl} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default App;
