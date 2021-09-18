const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://hackysack:Churchill1@cluster0.iklei.mongodb.net/library?retryWrites=true&w=majority'
const JWT_SECRET = 'supersecretstring' //LOL

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]


// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
    type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
    }

    input AuthorInit {
      name: String!
      born: Int!
    }

    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    
    type Token {
      value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
        title: String!
        author: AuthorInit!
        published: Int!
        genres: [String!]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author

        createUser(
          username: String!
          favoriteGenre: String!
        ): User

        login(
          username: String!
          password: String!
        ): Token
    }  
`

const resolvers = {
  Query: {
      bookCount: async () => {
        const books = await Book.find({})
        return books.length
      },
      authorCount: async () => {
        const authors = await Author.find({})
        return authors.length
      },
      allBooks: async (root, args) => {
          const books = await Book.find({})

          if(args.author && args.genre) {
            return books.filter(book => book.author === args.author.name && book.genres.includes(args.genre))
          }
          else if(args.author) {
            return books.filter(book => book.author === args.author.name)
          }
          else if(args.genre) {
            return books.filter(book => book.genres.includes(args.genre))
          }
          return books
        },
      allAuthors: async () => await Author.find({}),
      me: async (root, args, context) => context.currentUser
      
  },
  Author: {
    bookCount: async (root) => {
        const books = await Book.find({})
        console.log(books)
        books.reduce((totalBooks, book) => {
          if (root.name === book.author.name) {
              return (totalBooks += 1)
          }
          return totalBooks
      }, 0)
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      const test = await Author.findOne({ name: args.author.name })

      if(!context.currentUser) throw new AuthenticationError('no authentication found')
      
      if(test) {  
        try {
          const author = await Author.findOne({ name: args.author.name })
          const newBook = new Book({...args, author: author})
          await newBook.save()
          return newBook
        } catch (error){
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return newBook
      }
      else {
        const newAuthor = new Author({ name: args.author.name, born: args.author.born, bookCount: 1 })
        const newBook = new Book({...args, author: newAuthor})
        try {
          await newBook.save()
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return newBook
      }
    },
    editAuthor: (root, args) => { 
        console.log(args.setBornTo)
        const oldAuthor = authors.find(author => {
          console.log(`authors name: ${author.name} args name: ${args.name}`)
          return author.name === args.name
        })
        console.log(oldAuthor)
        const newAuthor = {
            ...oldAuthor, born: args.setBornTo
        }
        authors = authors.map(author => author.name !== args.name ? author : newAuthor)
        return newAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      await user.save()
        .catch (error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
        return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username})
      if(!user || args.password !== 'secret') throw new UserInputError("wrong login credentials")

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userForToken, JWT_SECRET)}
    }  
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})