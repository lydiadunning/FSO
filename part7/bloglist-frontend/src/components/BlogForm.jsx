import { useState } from "react"
import { createBlog } from "../reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(store => store.user)


  const addBlog = (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        'title': title,
        'author': author,
        'url': url,
        'user': user
      }
      dispatch(createBlog(newBlog))
      dispatch(setNotification({text:`New Blog ${title} by ${author} added`, isError: false}))
    } catch (exception) {
      dispatch(setNotification({text: 'Error:Blog not added', isError: true}))
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  } 

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
            <input
            required
            type="text"
            value={title}
            name="title"
            id='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            name="author"
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="url"
            id='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create">create</button>
      </form>  
    </div>    
  )
}

export default NewBlog