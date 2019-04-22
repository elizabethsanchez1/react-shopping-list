import React from 'react';

const styles = {
	input: {
		maxWidth: '88%',
		width: '100%',
		padding: 10,
		borderRadius: 3,
	}
};


function Input() {
	return ( <
		label >
		<
		input styles = {
			styles.input
		}
		type = 'text'
		placeholder = "Enter item here" / >
		<
		/label>
	)
}

export default Input;
