let timer = null

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
    if(timer !== null) {
        clearTimeout()
    }

    return async dispatch => {
        dispatch({
            type: 'POST',
            data: notification
        })
        timer = setTimeout(() => {
            console.log('5 secodns parssed')
            dispatch(removeNotification())
        }, 1000 * time)
    }
}

export const setNotificationLike = (notification, time) => {
    if(timer !== null) {
        clearTimeout()
    }

    return async dispatch => {
        dispatch({
            type: 'LIKE',
            data: notification
        })
        timer = setTimeout(() => {
            console.log('5 secodns parssed')
            dispatch(removeNotification())
        }, 1000 * time)
    }
}


export default reducer
