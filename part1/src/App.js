import { useState } from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>
      Number of exercises {props.parts.map(p => p.exercises).reduce((a, b) => a + b, 0)}
    </p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


// -----------------------------------------------------------------------------------

const Display = ({ counter }) => <div>{counter}</div>;


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App2 = (props) => {
  const [counter, setCounter] = useState(0)

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )

  function handleClick() {
    console.log("click plus");
  }

  const plus_one = () => setCounter(counter + 1);
  const reset = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={plus_one} text={"plus_one"} />
      <Button onClick={reset} text={"reset"} />
    </div>
  )
}

// -----------------------------------------------------------------------------------


const AppD = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setClicks({ ...clicks, left: clicks.left + 1 });
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setClicks({ ...clicks, right: clicks.right + 1 });
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
      <p>all clicks: {allClicks.join(' ')}</p>
    </div>
  )
}

export default AppD