import userService from '../services/allUsers'

const allUsersReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_USERS':
            return action.data
        default: return state

    }
}

export const initializeAllUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        console.log(users)
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

export default allUsersReducer