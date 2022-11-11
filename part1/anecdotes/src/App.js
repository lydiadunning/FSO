import { useState } from 'react'

const Button = ({ name, handler }) => {
  return (
    <>
      <button onClick={handler}>
        {name}
      </button>
    </>
  )
}

const MostVotes = ({ anecdotes, points }) => {
  const mostPoints = Math.max(...points)
  const mostPointsIndex = points.findIndex(x => x == mostPoints)

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostPointsIndex]}</p>
      <p>has {mostPoints} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const pointsArray = new Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(pointsArray)

  const randomHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteHandler = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
    MostVotes(anecdotes, points)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button name='vote' handler={voteHandler} />
      <Button name='next anecdote' handler={randomHandler} />
      <MostVotes anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App