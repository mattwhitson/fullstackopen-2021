import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const bookQuery = useQuery(ALL_BOOKS)
  const [filteredBooks, setFilteredBooks] = useState([])
  const [books, setBooks] = useState([])
  const [genreFilter, setGenreFilter] = useState('')
  const [genres, setGenres] = useState([])


  useEffect(() => {
    let genresInit = ['All Genres']
    if(bookQuery.data) {
      const bookList= bookQuery.data.allBooks
      bookList.forEach(book => {
        book.genres.forEach(genre => {
          if(genresInit.indexOf(genre) === -1) {
            genresInit.push(genre)
          }
        })
      })
      setBooks(bookQuery.data.allBooks)
      setGenreFilter('All Genres')
      
      setGenres(genresInit)
      
    }
  }, [bookQuery])

  useEffect(() => {
    if(genreFilter === 'All Genres') {
      setFilteredBooks(books)
    }
    else {
      const result = books.filter(book => book.genres.indexOf(genreFilter) !== -1)
      setFilteredBooks(result)
    }
  }, [genreFilter, books])

  
  if (!props.show) {
    return null
  }

  if(books.loading) {
    return <div>Loading...</div>
  }

  console.log(books)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre => 
        
          <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
        )}
    </div>
  )
}

export default Books