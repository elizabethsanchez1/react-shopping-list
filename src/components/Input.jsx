import React , { Component }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const styles = {
	input: {
		maxWidth: '88%',
		width: '100%',
		padding: 10,
		borderRadius: 3,
	}
};


// function Input() {
// 	return ( 
// 		<label>
// 			<input 
// 				styles={ styles.input }
// 				type = 'text'
// 				placeholder = "Enter item here" 
// 			/>
// 			<FontAwesomeIcon style={ { marginLeft: 5 } } icon={faPlus} />  
// 		</label>
// 	)
// }

class Input extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			input: '',
		}
	}

	/* 
	Add validation, 
	- no number allowd
	- no duplicate list items 
	- auto format, make all lowercase for them or uppercase the first letter
	*/
	handleInput = ( event ) => {
		event.persist();
		// console.log( 'my input event: ', event );
		console.log('text: ', event.target.value );
		this.setState( { input: event.target.value } );
	}

	render() {
		console.log('Input state', this.state);

		return (
			<label>
				<input 
					styles={ styles.input }
					type = 'text'
					placeholder = "Enter item here"
					onChange={ this.handleInput }
				/>
				<FontAwesomeIcon style={ { marginLeft: 5 } } icon={faPlus} />  
			</label>
		)
	}
}

export default Input;
