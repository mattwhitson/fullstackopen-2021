const Post = require('../models/post')



const initialPosts = [
  {
    title: 'HTML is easy',
    author: 'Matt',
    url: 'www.google.com',
    likes: 10,
  },
  {
    title: 'LOL',
    author: 'Leo',
    url: 'www.wikipedia.org',
    likes: 1,
  },
]


const totalLikes = async (blogs) => {
  const blogs = await Post.find{()}
  return blogs.reduce((sum, post) => sum + post.likes, 0)
}


const totalPosts = async () => {
  const blogs = await Post.find({})
  return blogs.map(blog => blog.toJSON())
}

const mostLikes = (blogs) => {
  const best = blogs.reduce((prev, current) => 
    prev.likes > current.likes ? prev : current, 0)

  return best
}

const mostBlogs = (blogs) => {
  let map = new Map()
  for(var i = 0; i < blogs.length; i++) {
    if(!map.has(blogs[i].author)) {
      map.set(blogs[i].author, 1)
    }
    else {
      let currentVal = map.get(blogs[i].author) + 1
      map.set(blogs[i].author, currentVal)
    }
  }
  let max = {
    author: '',
    blogs: 0
  }
  for (const [key, value] of map.entries()) {
    if(value > max.blogs) {
      max.author = key
      max.blogs = value
    }
  }
  return max
}

module.exports = {
  totalLikes,
  mostLikes,
  mostBlogs,
  totalPosts
}



