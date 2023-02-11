import { useState } from 'react'

const Title = () => (
  <div>
    give feedback
  </div>
)

const Button = ({ butName, onClick }) => (
  <button onClick={onClick}>
    {butName}
  </button>
)


const Statistics = ({ statName, data, algo }) => {
  console.log(statName, data);
  return (
    <div>
      {statName} {algo(data)}
    </div>
  )
}

const naN2Zero = (num) => isNaN(num) ? 0 : num

const sum = (data) => data.reduce((a, b) => a + b)
const avg = (data) => naN2Zero((data[0] * 1 + data[2] * (-1)) / sum(data))
const positive = (data) => (naN2Zero((data[0] / sum(data))) * 100) + '%'
const origin = (data) => data

const DisplayStat = ({ scoreList }) => scoreList.every(review => review == 0)
  ? (<div>No feedback given!</div>)
  : (<div>
    <Statistics statName={'good'} data={scoreList[0]} algo={origin} />
    <Statistics statName={'neutral'} data={scoreList[1]} algo={origin} />
    <Statistics statName={'bad'} data={scoreList[2]} algo={origin} />
    <Statistics statName={'all'} data={scoreList} algo={sum} />
    <Statistics statName={'avg'} data={scoreList} algo={avg} />
    <Statistics statName={'positive'} data={scoreList} algo={positive} />
  </div>)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const scoreList = [good, neutral, bad]

  return (
    <div>
      <Title />
      <br></br>
      <Button butName={'good'} onClick={() => setGood(good + 1)} />
      <Button butName={'neutral'} onClick={() => setNeutral(neutral + 1)} />
      <Button butName={'bad'} onClick={() => setBad(bad + 1)} />
      <DisplayStat scoreList={scoreList}/>
    </div>
  )
}

export default App