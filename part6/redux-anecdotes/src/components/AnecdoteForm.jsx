import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'
// import { setNotification } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const notification = `you added a new note: '${content}'`
    console.log(notification)
    dispatch(createAnecdote(content))
    // dispatch(setNotification(notification, 10))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit = { newAnecdote }>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )

}

export default AnecdoteForm