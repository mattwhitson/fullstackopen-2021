import React from 'react'

const Course = ({courses}) => {
  return (
    <div>
    <h1>Web Development Curriculum</h1>
    {courses.map(course => 
      <div>
        <Header course={course.name} />
        <Content course={course.parts} />
        <Total parts={course.parts} />
      </div>
      )}
    </div>
     
  )
}

const Header = ({course}) => (
  <h2>{course}</h2>
)

const Content = ({course}) => (
  <>
    {course.map(part =>
      <Part key={part.id} part={part} />
      )}
  </>
)

const Part = ({part}) => {
  return(
    <p>{part.name}: {part.exercises}</p>
  )
}


const Total = ({parts}) => {
  const sum = parts.reduce((a, b) => a + b.exercises, 0)
  return (
    <b>Number of exercises: {sum}</b>
  )
}

export default Course