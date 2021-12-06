import React from "react";

const Header = (props) => {
	return (
		<h1>{props.course}</h1>
	)
};
const Content = (props) => {
	console.log(props)
	return (
		<div>
			<Part part={props.part[0]}></Part>
			<Part part={props.part[1]}></Part>
			<Part part={props.part[2]}></Part>
		</div>
	);
};

const Part = (props) => {
	return (
		<p>
			{props.part.name} {props.part.exercises}
		</p>
	);
};

const Total = (props) => {
	return <p>Number of exercises {props.total}</p>;
};

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
			<Header course={course.name}></Header>
			<Content part={course.parts}></Content>

			<Total
				total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}
			></Total>
		</div>
	);
};

export default App;
