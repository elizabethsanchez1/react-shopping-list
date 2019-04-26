import React from 'react';
import Subtitle from './Subtitle';
import Input from './Input';
import Add from './Add';
import Search from './Search';
import Clear from './Clear';
import ListItems from './ListItems';

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
     		<Input />
      </div> 
     
      <div styles={ styles.allBtns }>
      	<Add/>
      	<Search/>
      	<Clear/>
      </div>
      	<ListItems/>

    </div> 
  )
}

export default Card;