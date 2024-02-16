import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import {useContext} from 'react'

import { useNotificationDispatch } from '../NotificationContext'


const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes'])
      dispatch({type: 'SHOW', payload: `added a new note, '${newAnecdote.content}'.`}) 
      setTimeout(() => dispatch({type: 'HIDE'}), 5000)
    },
    onError: (error) => {
      const errorMessage = error.response.data.error
      dispatch({ type: 'SHOW', payload: errorMessage })
      setTimeout(() => dispatch({type: 'HIDE'}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    const mutation = newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
