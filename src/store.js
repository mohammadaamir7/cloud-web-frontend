import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    loginReducer,
    registerReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userUpdateReducer
} from './reducers/userReducers'
import { addBlogReducer, getBlogReducer, getBlogsReducer } from './reducers/blogReducers'

const reducer = combineReducers({
  userLogin: loginReducer,
  userRegister: registerReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  addBlog: addBlogReducer,
  blogsData: getBlogsReducer,
  blog: getBlogReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
