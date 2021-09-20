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