import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GENRE_FILTER, ME } from '../queries'

const Recommendations = ({ show }) => {
    const user = useQuery(ME)
    const [genreFilter, result] = useLazyQuery(GENRE_FILTER)
    const [filteredBooks, setFilteredBooks] = useState([])

    useEffect(() => {
        if(user.data && result.data) {
            setFilteredBooks(result.data.allBooks)
        }
    },[user, result])

    useEffect(() => {
        if(user.data) {
            genreFilter({ variables: {genre: user.data.me.favoriteGenre } })
        }
    }, [user, genreFilter])

    console.log(user)

    if(!show) {
        return null
    }

    if(user.loading || result.loading) {
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