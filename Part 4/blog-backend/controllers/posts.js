const postsRouter = require('express').Router()
const Post = require('../models/post')

postsRouter.get('/', (request, response) => {
  Post.find({}).then(blogs => {
    return response.json(blogs)
  })
})

postsRouter.post('/', (request, response, next) => {
  const body = request.body

  const newPost = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  newPost.save()
    .then(savedPost => {      
      response.json(savedPost)
    })
    .catch(error => next(error))
})

module.exports = postsRouter