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

class Input extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			allows: 'letters',
			doNotAllow: 'number',
			input: '',
			errorMessage: 'No number allowed',
			showError: false,
		}
	};

	/* 
	Add validation, 
	- no number allowd
	- no duplicate list items 
	- auto format, make all lowercase for them or uppercase the first letter
	*/
	handleInput = ( event ) => {
		// tells react to pass us the entire vent
		event.persist();
		console.log('event object: ', event);
		const userInput = event.target.value;

		// will return true if there are any numbers
		if ( userInput.match( /^[^0-9]+$/ ) ) {
			console.log('input is only letters');

			// this.setState is the only way you can update this.state
			this.setState( {
			    showError: false,
			} );
		} else {
			console.log('we have at least one number in the input');

			this.setState( {
				showError: true,
			} )
		}
	}

	render() {
		console.log('Input state', this.state);
		console.warn('what is my id prop ', this.props );

		return (
			<label>
				<p> 
				    { 
					  ( this.state.showError === true ) 
						? this.state.errorMessage 
						: '' 
					} 
				</p>

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
