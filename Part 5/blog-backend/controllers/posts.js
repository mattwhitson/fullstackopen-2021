const postsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Post = require('../models/post')
const User = require('../models/user')


postsRouter.get('/', async (request, response) => {
  const posts = await Post.find({}).populate('user', { username: 1, name: 1})

  response.json(posts)
})

postsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = request.token
  
  const user = request.user

  if(user === null) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

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
    likes: body.likes,
    user: user._id,
  })
  const savedPost = await newPost.save()
  user.posts = user.posts.concat(savedPost._id)
  await user.save()

  response.json(savedPost)
})


postsRouter.delete('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  if(post.user._id.toString() === user._id.toString()){
    await Post.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  else {
    return response.status(401).json({error: "the user did not create this post"})
  }
})

postsRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log('made it here anyways KEK')
  const updatedPost = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Post.findByIdAndUpdate(request.params.id, updatedPost, { new: true })
    .then(updatePost => {

      response.json(updatePost)
    })
})

module.exports = postsRouter