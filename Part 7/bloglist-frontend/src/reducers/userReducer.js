import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'LOCAL':
            return action.data
        case 'LOG':
            console.log(action.data)
            return action.data
        default:
            return state
    }
}


export const logIn = (username, password) => {
    return async dispatch => {  
        try{
            const userCredentials = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(userCredentials)
            )
            blogService.setToken(userCredentials.token)
            
            dispatch({
                type: 'LOG',
                data: userCredentials
            })
            
            dispatch(setNotification('You have successfully logged in', '',  5))
        } catch (error) {
            dispatch(setNotification('ERROR: Authorization failed', 'error',  5))
        }
        
    }
}

export const checkLocalStorage = () => {
    return async dispatch => {
        const userJSON = window.localStorage.getItem('loggedNoteappUser')
        if(userJSON) {
            const user = JSON.parse(userJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'LOCAL',
                data: user
            })
        }
        else {
            dispatch({
                type: 'LOCAL',
                data: null
            })
        }
    }
}

export default userReducer