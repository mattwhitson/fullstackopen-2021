
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

export const removeNotification = () => {
    return {
        type: 'HIDE',
        data: 'hey bitch its been 5 seconds'
    }
}

export const setNotificationTitle = (notification) => {
    return {
        type: 'POST',
        data: notification
    }
}

export const setNotificationLike = (notification) => {
    return {
        type: 'LIKE',
        data: notification
    }
}


export default reducer
