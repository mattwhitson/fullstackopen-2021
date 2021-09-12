const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'POST': 
            console.log('we are now alive')
            return action.data
        case 'HIDE':
            return null
        default: return state
    }
}

const removeNotification = () => {
    return {
        type: 'HIDE',
        data: {
            notification: 'hey bitch its been 5 seconds',
            success: false
        }
    }
}

export const setNotification = (message, value, time) => {
    return async dispatch => {
        console.log('made it this far')
        dispatch({
            type: 'POST',
            data: {
                notification: message,
                success: value
            }
        })
        setTimeout(() => {
            dispatch(removeNotification())
        }, 1000 * time)
    }
}


export default  notificationReducer 