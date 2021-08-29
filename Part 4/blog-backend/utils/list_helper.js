const totalLikes = (blogs) => {
  const total = blogs.reduce((prev, current) => 
    prev + current.likes, 0)


  return total
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
  mostBlogs
}






// const dummy = (blogs) => {
//   return 1
// }

// module.exports = {
//   dummy
// }