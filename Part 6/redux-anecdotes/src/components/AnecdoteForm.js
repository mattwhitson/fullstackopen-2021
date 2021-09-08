import React from 'react'
import { useDispatch} from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {  setNotificationTitle } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNotification = (content) => {
        dispatch(setNotificationTitle(content, 5))
    }


    

    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdoteNew = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(anecdoteNew))
        addNotification(anecdoteNew)
      }

    return(
        <form onSubmit={newAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm