import { useDispatch, useSelector } from "react-redux"
import { editBlog } from "../reducers/blogReducer"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setNotification } from "../reducers/notificationReducer"
import { deleteBlog } from "../reducers/blogReducer"
import BlogComments from "./BlogComments"

const Blog = ({ blogs }) => {
  const [likes, setLikes] = useState(null)

  const blogId = useParams().id
  const blog = blogs.find(blog => blog.id === blogId)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  if (!blog) {
    return null
  }  

  if (likes === null) {
    setLikes(blog.likes)
  }
  
  const addLike = () => {
    const currentLikes = likes + 1
    const newBlog = {
      ...blog,
      likes: currentLikes,
    }
    dispatch(editBlog(newBlog))
    .then(() => setLikes(currentLikes))
    .catch ( () => {
      dispatch(setNotification({text: 'Error:Blog like not added', isError: true}))
    })
  }

  const deleteHandler = () => {
    const confirmation = window.confirm(`Removing ${blog.title} by ${blog.author}.`)
    if (confirmation) {
      dispatch(deleteBlog(blogId)).then(() => {
        dispatch(setNotification({text: `${blog.title} has been deleted`, isError: false}))
        navigate('/')
      })
    }
  }

  return (
    <>
      <h3>{blog.title} - {blog.author}</h3>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{likes} likes <button type='button' onClick={addLike}>like</button></p>
      <p>added by {blog.user.name}</p>
      {blog.user.username === user.username && <button  onClick={deleteHandler}>delete</button>}
      <BlogComments blog={blog}/>
    </>
    
  )
}

export default Blog