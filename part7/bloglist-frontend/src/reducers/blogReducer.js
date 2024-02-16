import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push({...action.payload, likes: 0})
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
  },
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {

  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog({...newBlog, user: content.user}))
  }
}

export const editBlog = content => {
  return async dispatch => {
    console.log('editing', content)
    const {user, ...contentNoUser} = content
    const updatedBlog = await blogService.update(content.id, contentNoUser)
    dispatch(updateBlog({...updatedBlog, user: user}))
  }
}

export const deleteBlog = blogId => {
  return async dispatch => {
    await blogService.deleteThis(blogId)
    dispatch(removeBlog(blogId))
  }
}

export const addBlogComment = content => {
  return async dispatch => {
    const {user, ...contentNoUser} = content
    const updatedBlog = await blogService.postComment(blogId, comment)
    dispatch(updateBlog({...updatedBlog, user: user}))
  }
}

export default blogSlice.reducer
