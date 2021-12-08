import React from "react";

const PersonForm = ({ type, value, onChange }) => {
	return (
		<div>
			{type}: <input value={value} onChange={onChange} />
		</div>
	);
};

export default PersonForm;
