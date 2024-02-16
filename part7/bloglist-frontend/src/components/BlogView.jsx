import { useRef } from "react"
import Togglable from "./Toggleable"
import BlogForm from "./BlogForm"
import BlogList from "./BlogList"

const BlogView = ({ blogs }) => {
  const blogFormRef = useRef()

  
  return (
    <>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm/>
      </Togglable>
      <BlogList blogs={blogs}/>
    </>
  )
}

export default BlogView