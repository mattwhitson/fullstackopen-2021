import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from '../reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'
import allUsersReducer from '../reducers/allUsersReducer'


const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    allUsers: allUsersReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store