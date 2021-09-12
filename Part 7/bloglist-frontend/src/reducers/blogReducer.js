import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT':
            return action.data
        case 'ADD':
            return state.concat(action.data)
        case 'UPDATE':
            const id = action.data.id
            return state.map(blog => blog.id !== id ? blog : action.data)
        case 'DELETE':
            const identification = action.data
            return state.filter(blog => blog.id !== identification)
        default: return state
    }
}

export const addBlog = (post) => {
    return async dispatch => {
        const newPost = await blogService.create(post)
        dispatch({
            type: 'ADD',
            data: newPost
        })
    }
}

export const updateBlog = newObj => {
    return async dispatch => {
        await blogService.update(newObj)
        dispatch({
            type: 'UPDATE',
            data: newObj
        })
    }
}

export const initalizeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'DELETE',
            data: id
        })
    }
}

export default blogReducer