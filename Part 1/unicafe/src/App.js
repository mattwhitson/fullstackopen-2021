import React, { useState } from 'react'


const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Statistics = (props) => {
  if(props.good + props.bad + props.neutral === 0) {
    return(
      <p>No Feedback Received</p>
    )
  }

  const sum = props.good + props.bad + props.neutral
  const pos = props.good / sum
  let avg = (props.good * 1 + props.bad * -1) / sum

  if(avg < 0) avg = 0;

  return(
    <table>
      <StatisticLine text="Good" val={props.good} />
      <StatisticLine text="Neutral" val={props.neutral} />
      <StatisticLine text="Bad" val={props.bad} />
      <StatisticLine text="All" val={sum} />
      <StatisticLine text="Average" val={avg} />
      <StatisticLine text="Positive" val={pos} />
    </table>
  )
}

const StatisticLine = ({text, val}) => {
  if(text === "Positive") {
    return (
    <tr>
      <td>{text}:</td>
      <td>{val} %</td>
    </tr>
    )
  }

  return(
    <tr>
      <td>{text}:</td>
      <td>{val}</td>
    </tr>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="Give Feedback" />
      <div>
        <Button handleClick={() => setGood(good + 1)} text="Good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      </div>
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
