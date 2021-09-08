import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  
  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const anecdoteFound = state.find(anecdote => anecdote.id === id)
      const anecdoteUpdated = {
        ...anecdoteFound, votes: anecdoteFound.votes + 1
      
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : anecdoteUpdated)

    case 'ADD':
      const newAnecdote = {
        content: action.data,
        votes: 0
      }
      return state.concat(newAnecdote)
    
    case 'INIT_NOTES':
      return action.data
    
    default: 
      return state
  }

  
}

export const addLike = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = (anecdote)=> {
  
  return {
    type: 'ADD',
    data: anecdote 
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