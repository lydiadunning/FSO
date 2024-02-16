import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return anecdotes
    } else {
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    }
  })

  const sortedAnecdotes = anecdotes.toSorted((a, b) => {
    return a.votes > b.votes ? 1 
         : a.votes < b.votes ? -1
         : 0
  })


  const vote = (anecdote) => {
    dispatch(voteFor(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }


  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList