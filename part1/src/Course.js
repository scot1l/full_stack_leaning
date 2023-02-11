const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map(part => <Part part={part} />)

const Course = ({ course }) => {
  let { id, name, parts } = course
  const total = parts.map(part => part.exercises).reduce((a, b) => {
    console.log(a, b)
    return a + b
  })

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={total} />
    </div>
  )
}

export default Course