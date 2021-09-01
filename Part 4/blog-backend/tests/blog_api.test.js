const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Post = require('../models/post')

const api = supertest(app)

const listHelper = require('../tests/list_helper')



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



describe('testing get requests', () => {

  beforeEach(async () => {
    await Post.deleteMany({})
    const postObject = new Post(initialPosts[0])
    await postObject.save()
    const postObj = new Post(initialPosts[1])
    await postObj.save()
  }, 150000)


  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialPosts.length)
  }, 100000)

  test('id is correct', async () => {
    const blogs = await Post.find({})
    expect(blogs[0].id).toBeDefined()
  })


  afterAll(() => {
    mongoose.connection.close()
  })

})


// describe('testing post requests', () => {

//   beforeEach(async () => {
//     await Post.deleteMany({})
//     const postObject = new Post(initialPosts[0])
//     await postObject.save()
//     const postObj = new Post(initialPosts[1])
//     await postObj.save()
//   }, 150000)

//   test('post is saved', async () => {

//     const newPost = {
//       title: 'I like cats',
//       author: 'Henry',
//       url: 'dogs',
//       likes: 5,
//     }

//     await api
//       .post('/api/blogs')
//       .send(newPost)
//       .expect('Content-Type', /application\/json/)
//       .expect(200)


//     const numOfBlogs = await listHelper.totalPosts()
//     expect(numOfBlogs).toHaveLength(initialPosts.length + 1)
//   })

//   test('missing title and/or url 400', async () => {
//     const newPost = {
//       author: 'bill'
//     }

//     await api
//       .post('/api/blogs')
//       .send(newPost)
//       .expect(400)


//     const notesAtEnd = await listHelper.totalPosts()

//     expect(notesAtEnd).toHaveLength(initialPosts.length)
//   })

//   test('like set to 0 if uninitalized', async () => {
//     const newPost = new Post({
//       title: 'Test',
//       author: 'Bobby Dean',
//       url: 'dogs',
//     })

//     await newPost.save()
//     const blogs = await totalPosts()
//     const savedPost = blogs.map(post => post.title === "Test")
//     expect(savedPost.likes).toBe(0)

//   })
// })

// describe('random other functionality tests', () => {

//   beforeEach(async () => {
//     await Post.deleteMany({})
//     const postObject = new Post(initialPosts[0])
//     await postObject.save()
//     const postObj = new Post(initialPosts[1])
//     await postObj.save()
//   }, 150000)


//   test('All blog likes', async () => {
//     const result = await listHelper.totalLikes(blogs)
//     expect(result).toBe(36)
//   })

//    test('post with most likes!', () => {
//     const result = listHelper.mostLikes(blogs)
//     expect(result).toEqual(blogs[2])
//   })

//    test('most blogs posts', () => {
//       const most = 
//       {
//         author: "Robert C. Martin",
//         blogs: 3
//       }
//       const result = listHelper.mostBlogs(blogs)
//       expect(result).toEqual(most)
//     })
// })
