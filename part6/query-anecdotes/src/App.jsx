import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({type: 'SHOW', payload: `voted for '${updatedAnecdote.content}'.`})
      setTimeout(() => dispatch({type: 'HIDE'}), 5000)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }
  
  const result = useQuery({
    queryKey: ['anecdotes'], 
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  let anecdotes = []


  if ( result.isError ) {
    return <div>Anecdote service not available due to problems in server...</div>
  } else if (result.isLoading) {
    return <div>loading... </div>
  } else if (result.isSuccess) {
    anecdotes = result.data
  }

  console.log(JSON.parse(JSON.stringify(anecdotes)))


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
