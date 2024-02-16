import { useState } from "react"
import { editBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"

const BlogComments = ({ blog }) => {
  const [newComment, setNewComment] = useState('')

  const dispatch = useDispatch()

  const addComment = (event) => {
    const newBlog = {...blog, comments: [...blog.comments, newComment]}
    dispatch(editBlog(newBlog))
  }

  console.log(blog.comments)

  return (
    <>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input name='comment' value={newComment} onChange={({ target }) => setNewComment(target.value)}/>
        <button type='submit'>add new comment</button>
      </form>
      <ul>
        {blog.comments?.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </>
  )
}

export default BlogComments