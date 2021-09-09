import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {  setNotificationTitle } from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {

    const addNotification = (content) => {
        props.setNotificationTitle(content, 5)
    }


    

    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdoteNew = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(anecdoteNew)
        addNotification(anecdoteNew)
      }

    return(
        <form onSubmit={newAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}



const ConnectedAnecdoteForm = connect(null, { addAnecdote, setNotificationTitle })(AnecdoteForm)
export default ConnectedAnecdoteForm