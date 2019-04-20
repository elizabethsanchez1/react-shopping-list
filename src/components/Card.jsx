import React from 'react';
import Subtitle from './Subtitle';

const styles = {
	container: {
		border: '3px solid #9099A2',
		borderRadius: 10,
		background: '#96858F',
		padding: 10,
		fontSize: 15,
		maxWidth: 500,
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap'
	},
	centerInput: {
		margin: '0 auto',
	},
	allBtns: {
		display: 'flex',
		justifyContent: 'center',
	}
};

function Card() {
  return (
    <div style={ styles.container }>
      
      <div styles={ styles.centerInput }>
				<Subtitle />
      </div> 
     
      <div styles={ styles.allBtns }>

       { /*
			 
					<Add/>
        <Clear/>
        <Search/>
			*/	}
        
				<p>My Card</p>
      </div>
      

    </div> 
  )
}

export default Card;