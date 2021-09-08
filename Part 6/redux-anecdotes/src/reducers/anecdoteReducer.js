import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  
  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)

    case 'ADD':
      return state.concat(action.data)
    
    case 'INIT_NOTES':
      return action.data
    
    default: 
      return state
  }

  
}

export const addLike = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote, votes: anecdote.votes + 1
    }
    await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const addAnecdote = (anecdote)=> {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'ADD',
      data: newAnecdote 
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT_NOTES',
    data: anecdotes,
    })
  }
}

export default reducer