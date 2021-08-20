import React from 'react'


const Header = ({course}) => (
  <h1>{course}</h1>
)

const Content = ({course}) => (
  <>
    <Part part={course.parts[0]} />
    <Part part={course.parts[1]} />
    <Part part={course.parts[2]} />
  </>
)

const Part = ({part}) => (
  <p>{part.name} {part.exercises}</p>
)

const Total = ({course}) => (
  <p>Number of exercises: {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
)

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
      
      <Content course={course} />
      
      <Total course={course} />
    </div>
  )
}

export default App
