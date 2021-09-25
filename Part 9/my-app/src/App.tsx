import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header header={courseName} />
      {courseParts.map(course => 
          <Content name={course.name} exerciseCount={course.exerciseCount} />
        )}
      <Total courses={courseParts} />
    </div>
  );
};

export default App;