import React from 'react';

function Listitems() {
  return (
<div className="items">
    <div className='border-container'>
    <input className='list' type="checkbox" checked/>
    <label className='list-item' for="item1">oranges</label>
      </div>
  
    <div className='border-container'>
    <input className='list' type="checkbox"/>
    <label className='list-item' for="item2">apples</label>
      </div>
      
    <div className='border-container'>
    <input className='list' type="checkbox"/>
    <label className='list-item' for="item3">meat</label>
      </div>
      
    <div className='border-container'>
    <input className='list' type="checkbox"/>
    <label className='list-item' for="item4">cheese</label>
      </div>
      
    <div className='border-container'>
    <input className='list' type="checkbox"/>
    <label className='list-item' for="item5">cereal</label>
     </div>
    </div>
  )
}

export default Listitems;

