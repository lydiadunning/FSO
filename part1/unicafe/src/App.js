import { useState } from 'react'

const Button = ({ text, onClick }) => {
  console.log(text, "with", onClick)
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
    </>
  )
}

const Stats = ({ name, stat }) => {
  return (
    <>
      <p>{name} {stat}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const neutralHandler = () => setNeutral(neutral + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={() => setGood(good + 1)}/>
      <Button text='neutral' onClick={neutralHandler}/>
      <Button text='bad' onClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Stats name='good' stat={good}/>
      <Stats name='neutral' stat={neutral}/>
      <Stats name='bad' stat={bad}/>

    </div>
  )
}

export default App