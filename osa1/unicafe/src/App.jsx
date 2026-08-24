import { useState } from 'react'

const StatisticLine =(props) => {
return (
  <p>{props.text} {props.value}</p>
  
)
}
const Statistics = (props) => {
  
  const average = (props.good - props.bad) / (props.good + props.neutral + props.bad)
  const positive = (props.good / (props.good + props.neutral + props.bad)) * 100 
    if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
        return (
      <div>
        <p>No feedback given</p>
      </div>)
    }
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} /> 
      <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
      <StatisticLine text="average" value={props.good} />
      <StatisticLine text="good" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick ={() => props.setProp(props.value+1)}  > {props.text} </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button value ={good} setProp={setGood} text="good" />
      <Button value ={neutral} setProp={setNeutral} text="neutral" />
      <Button value ={bad} setProp={setBad} text="bad" />
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App