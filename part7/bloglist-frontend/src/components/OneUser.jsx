import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const OneUser = () => {
  const id = useParams().id
  const users = useSelector(store => store.allUsers)
  const user = users.find(user => user.id === id)

  if(!user) {
    return null
  }

  return (
    <>
      <h1>{user.name}</h1>
      <legend>added blogs</legend>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>
  )
}

export default OneUser