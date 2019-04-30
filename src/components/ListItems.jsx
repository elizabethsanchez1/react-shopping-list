import React from 'react';

function Listitems( props ) {
  console.log('what are my props?', props);
  console.log( 'props.items', props.items );

  return (
  <div className="items">
    {/* <div className='border-container'>
    <input 
      className='list'
      type="checkbox"
      checked
      onChange={ () => console.log() } 
    />
    <label className='list-item' htmlFor="item1">oranges</label>
    </div> */}

    {
      props.items.map( function( item ) {
        return (
          <div key={ item } className='border-container'>
            <input 
              className='list'
              type="checkbox"
              checked
              onChange={ () => console.log() } 
            />
            <label className='list-item' htmlFor="item1"> { item } </label>
          </div>
        )
      } )
    }
  
    {/* <div className='border-container'>
    <input className='list' type="checkbox"/>
    <label className='list-item' htmlFor="item2">apples</label>
      </div>
      
    <div className='border-container'>
    <input className='list' type="checkbox"/>
    <label className='list-item' htmlFor="item3">meat</label>
      </div>
      
    <div className='border-container'>
    <input className='list' type="checkbox"/>
    <label className='list-item' htmlFor="item4">cheese</label>
      </div>
      
    <div className='border-container'>
    <input className='list' type="checkbox"/>
    <label className='list-item' htmlFor="item5">cereal</label>
     </div> */}
  </div>
  )
}

export default Listitems;

