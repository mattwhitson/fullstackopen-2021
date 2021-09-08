
const reducer = (state = "hello", action) => {
    switch(action.type) {
        case 'POST':
            const newNotification = action.data
            return `You've created a new post titled: ${newNotification}`
        case 'LIKE':
            const post = action.data
            return `You've liked the post titled ${post}`
        case 'HIDE':
            return null
        default: return state
    }
}

const removeNotification = () => {
    return {
        type: 'HIDE',
        data: 'hey bitch its been 5 seconds'
    }
}

export const setNotificationTitle = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'POST',
            data: notification
        })
        setTimeout(() => {
            console.log('5 secodns parssed')
            dispatch(removeNotification())
        }, 1000 * time)
    }
}

export const setNotificationLike = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'LIKE',
            data: notification
        })
        setTimeout(() => {
            console.log('5 secodns parssed')
            dispatch(removeNotification())
        }, 1000 * time)
    }
}


export default reducer
