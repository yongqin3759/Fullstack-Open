import React from "react";

const PhoneNumberList = ({ persons, onClick }) => {
	
	return persons.map((person) => (
		<div key={person.id}>
			{person.name} {person.number} <button onClick={()=>onClick(person.id)}>delete</button>
		</div>
	));
};

export default PhoneNumberList;
