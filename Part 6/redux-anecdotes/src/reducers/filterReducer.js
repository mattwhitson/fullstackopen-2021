const reducer = (state = 'ALL', action) => {
    switch(action.type) {
        case 'SET':
            console.log(action.data)
            return action.data
        case 'ALL':
            return 'ALL'
        default: return state
    }
}

export const setFilter = (content) => {
    if (content === '') {
        return {
            type: 'ALL',
            data: content
        }
    }
    return {
        type: 'SET',
        data: content
    }
}

export default reducer