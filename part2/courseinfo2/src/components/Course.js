import React from 'react';

const Header = ({ coursename }) => {
    return (
      <h2>{coursename}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    console.log(parts)
    let sum = parts.reduce((previousSum,part)=>{
        return previousSum + part.exercises
    }, 0)
    return(
      <h3>Total of {sum} exercises</h3>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part=>(
          <Part key={part.id} part = {part}/>
        ))}
      </div>
    )
  }
  
  const Course = ({course}) =>{
    console.log({course})
    return(
      <div>
        <Header coursename = {course.name}></Header>
        <Content parts = {course.parts}></Content>
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course