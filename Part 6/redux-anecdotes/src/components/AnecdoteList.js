import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'
import {  setNotificationLike } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filters, anecdotes}) => {
        if ( filters === 'ALL' ) {
          return anecdotes
        }
        const filter = new RegExp( filters, 'i' )
        return anecdotes.filter(anecdote => anecdote.content.match(filter))  
    })

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(addLike(anecdote))
        addNotification(anecdote.content)
      }

    const addNotification = (content) => {
        dispatch(setNotificationLike(content, 5))
    }


    return(
        <>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => 
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList