const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
    <Part part={props.parts[0].name} 
     exercises={props.parts[0].exercises} />
    <Part part={props.parts[1].name} 
     exercises={props.parts[1].exercises} />
    <Part part={props.parts[2].name} 
     exercises={props.parts[2].exercises} />
    </>
  )
}
const Total = (props) => {
  const [part1, part2, part3] = props.parts
  const total = part1.exercises + part2.exercises + part3.exercises
  return (
    <>
      <p>Number of exercises {total}</p>
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
    <Header header={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
   </div>
  );
}

export default App;
