const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Post = require('../models/post')

const totalPosts = async () => {
  const blogs = await Post.find({})
  console.log(blogs)
  return blogs.map(blog => blog.toJSON())
}




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
beforeEach(async () => {
  await Post.deleteMany({})
  const postObject = new Post(initialPosts[0])
  await postObject.save()
  const postObj = new Post(initialPosts[1])
  await postObj.save()
}, 150000)

describe('server tests', () => {

  // test('notes are returned as json', async () => {
  //   await api
  //     .get('/api/blogs')
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/)
  // }, 100000)

  // test('all notes are returned', async () => {
  //   const response = await api.get('/api/blogs')

  //   expect(response.body).toHaveLength(initialPosts.length)
  // }, 100000)

  // test('there are two notes', async () => {
  //   const response = await api.get('/api/blogs')

  //   expect(response.body).toHaveLength(2)
  // }, 100000)

  // test('id is correct', async () => {
  //   const blogs = await Post.find({})
  //   expect(blogs[0].id).toBeDefined()
  // })

  // test('post is saved', async () => {

  //   const newPost = {
  //     title: 'I like cats',
  //     author: 'Henry',
  //     url: 'dogs',
  //     likes: 5,
  //   }

  //   await api
  //     .post('/api/blogs')
  //     .send(newPost)
  //     .expect('Content-Type', /application\/json/)
  //     .expect(200)


  //   const numOfBlogs = await totalPosts()
  //   expect(numOfBlogs).toHaveLength(initialPosts.length + 1)


  // })

  test('missing title and/or url 400', async () => {
    const newPost = {
      author: 'bill'
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)


    const notesAtEnd = await totalPosts()

    expect(notesAtEnd).toHaveLength(initialPosts.length)
  })

  // test('like set to 0 if uninitalized', async () => {
  //   const newPost = new Post({
  //     title: 'Test',
  //     author: 'Bobby Dean',
  //     url: 'dogs',
  //   })

  //   await newPost.save()
  //   const blogs = await totalPosts()
  //   const savedPost = blogs.map(post => post.title === "Test")
  //   expect(savedPost.likes).toBe(0)

  // })

  afterAll(() => {
    mongoose.connection.close()
  })
})







// const listHelper = require('../utils/list_helper')



// describe('favourite post', () => {

//   const blogs = [
//   {
//     _id: "5a422a851b54a676234d17f7",
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,
//     __v: 0
//   },
//   {
//     _id: "5a422aa71b54a676234d17f8",
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//     __v: 0
//   },
//   {
//     _id: "5a422b3a1b54a676234d17f9",
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//     likes: 12,
//     __v: 0
//   },
//   {
//     _id: "5a422b891b54a676234d17fa",
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10,
//     __v: 0
//   },
//   {
//     _id: "5a422ba71b54a676234d17fb",
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
//     __v: 0
//   },
//   {
//     _id: "5a422bc61b54a676234d17fc",
//     title: "Type wars",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//     likes: 2,
//     __v: 0
//   }  
// ]

//     test('most blogs posts', () => {
//       const most = 
//       {
//         author: "Robert C. Martin",
//         blogs: 3
//       }
//       const result = listHelper.mostBlogs(blogs)
//       expect(result).toEqual(most)
//     })

  // test('post with most likes!', () => {
  //   const result = listHelper.mostLikes(blogs)
  //   expect(result).toEqual(blogs[2])
  // })
// })

// describe('total likes', () => {
  

//   test('All blog likes', () => {
//     const result = listHelper.totalLikes(blogs)
//     expect(result).toBe(36)
//   })

//   test('when list has only one blog, equals the likes of that', () => {
//     const result = listHelper.totalLikes(listWithOneBlog)
//     expect(result).toBe(5)
//   })
// })





// const listHelper = require('../utils/list_helper')

// test('dummy returns one', () => {
//   const blogs = []

//   const result = listHelper.dummy(blogs)
//   expect(result).toBe(1)
// })