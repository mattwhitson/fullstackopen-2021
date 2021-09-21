const { ApolloServer, UserInputError, gql } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')


const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET //LOL

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
    type Author {
      name: String!
      born: Int
      bookCount: Int!
    }

    type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
    }


    input AuthorInit {
      name: String!
      born: Int
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
        author: String!
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

          const books = await Book.find({}).populate('author')
          console.log(books)
          return books
        
          if(args.author && args.genre) {
            const book = books.filter(book => book.author === args.author.name && book.genres.includes(args.genre))
            return book
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
      console.log('HELLLO MOTHER FUCKER')
      const test = await Author.findOne({ name: args.author })
      console.log(context.currentUser)
      if(!context.currentUser) throw new AuthenticationError('no authentication found')

      if(test) {  
        const author = await Author.findOne({ name: args.author })
        const newBook = new Book({...args, author: author})
        try {
          await newBook.save()
          return newBook
        } catch (error){
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      else {
        const newAuthor = new Author({ name: args.author, born: null, bookCount: 1 })
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
    editAuthor: async (root, args, context) => { 
      if(!context.currentUser) {
        throw new AuthenticationError('no authentication found')
      }
      const author = await Author.findOne({ name: args.name})
      author.born = args.setBornTo
      try {
        author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
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