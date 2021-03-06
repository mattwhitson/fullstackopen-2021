import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors  {
      name,
      born
    }
  }
`

export const ALL_BOOKS = gql`
query {
    allBooks {
        title,
        published,
        author {
            name
            born
        }
        genres
    }
}`

export const ME = gql`
query {
    me {
        username,
        favoriteGenre
    }
}
`

export const GENRE_FILTER = gql`
query genreFilter($genre: String!) {
    allBooks(genre: $genre) {
        title,
        published,
        author {
            name
            born
        }
        genres
    }

}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        author {
            name
            born
        }
    }
}`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        name
        born
    }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
      bookAdded {
        title,
        published,
        author {
            name
            born
        }
        genres
      }
  }
`