import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME} from '../queries'

const Recommendations = ({ show }) => {
    const user = useQuery(ME)
    const books = useQuery(ALL_BOOKS)
    const [filteredBooks, setFilteredBooks] = useState([])

    useEffect(() => {
        if(user.data && books.data) {
        const bookList = books.data.allBooks
        const result = bookList.filter(book => book.genres.indexOf(user.data.me.favoriteGenre) !== -1)
        setFilteredBooks(result)
        console.log(`RESULT`)
        console.log(result)
        console.log(`FAV GEN`)
        console.log(user)
        }
    },[user, books])

    console.log(user)

    if(!show) {
        return null
    }

    if(user.loading || books.loading) {
        return(
            <div>Loading...</div>
        )
    }


    return(
        <>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre {user.data.me.favoriteGenre}</p>
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
        </>
    )
}

export default Recommendations