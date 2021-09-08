import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'
import {  setNotificationLike } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'

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
        setTimeout(() => {
            console.log('5 secodns parssed')
            hideNotification()
        }, 5000)
      }

    const addNotification = (content) => {
        dispatch(setNotificationLike(content))
    }

    const hideNotification = () => {
        dispatch(removeNotification())
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