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
			allows: 'letters',
			doNotAllow: 'number',
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
		// tells react to pass us the entire vent
		event.persist();
		const NumberValidation = [A-Za-z];
		if (numberValidation === false) {
			console.log("number was intered")
		}



		// console.log( 'my input event: ', event );

		// // console.log('text: ', event.target.value );
		// // this.setState( { 
		// // 	input: event.target.value,
		// // 	newField: '1',
		//   } );
	}

	render() {
		console.log('Input state', this.state);
		console.warn('what is my id prop ', this.props );

		return (
			<label>
				<input 
					styles={ styles.input }
					type = 'text'
					placeholder = "Enter item here"
					onChange={ this.handleInput }
				/>
				<FontAwesomeIcon style={ { marginLeft: 5 } } icon={faPlus} /> 
				 <p> { this.state.input } </p>
			</label>
		)
	}
}

export default Input;
