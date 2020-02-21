import React from 'react';

const ColoredInput = props => {
	const { value, onChange, placeholder = '' } = props;
	return (
		<div className="active-cyan-4 mb-4">
			<input
				className="form-control"
				placeholder={placeholder}
				aria-label="Search"
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
		</div>
	);
};

export default ColoredInput;
