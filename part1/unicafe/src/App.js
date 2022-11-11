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

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>
          {text}  
        </td>
        <td>
          {value}
        </td>
      </tr>
    </>
  )
}

const Stats = ({ counts }) => {
  const [good, neutral, bad] = counts
  const all = good + neutral + bad
  if (all) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={all}/>
          <StatisticLine text='average' value={(good - bad) / all}/>
          <StatisticLine text='positive' value={(good / all * 100) + '%'}/>
        </table>
        
      </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={() => setGood(good + 1)}/>
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' onClick={() => setBad(bad + 1)}/>
      <Stats counts={[good, neutral, bad]} />

    </div>
  )
}

export default App