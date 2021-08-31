const postsRouter = require('express').Router()
const Post = require('../models/post')

postsRouter.get('/', async (request, response) => {
  const posts = await Post.find({})
  response.json(posts)
})

postsRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.likes === undefined) {
    body.likes = 0
  }

  if(body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  }

  const newPost = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  const savedPost = await newPost.save()
  response.json(savedPost)
})


postsRouter.delete('/:id', async (request, response) => {
  const post = await Post.findByIdAndRemove(request.params.id)
  console.log(request.params.id)
  return response.status(204).end()
})

module.exports = postsRouter