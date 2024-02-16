import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  },
})

export const { setUser } = loginSlice.actions

export const userFromBrowser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
  
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.removeToken()
    dispatch(setUser(null))
  }
}

export default loginSlice.reducer
