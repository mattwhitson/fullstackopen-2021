import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'
import {  setNotificationLike } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(addLike(anecdote.id))
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