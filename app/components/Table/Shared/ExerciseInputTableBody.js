import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import ExerciseInputRow from './ExerciseInputRow';


const ExerciseInputTableBody = ( { items, updateField, disableAutoJump }) => {
  return (
    <FlatList
      data={ items }
      renderItem={({ item, index }) =>  (
        <ExerciseInputRow
          set={ item.set }
          weight={ item.weight }
          reps={ item.reps }
          onChange={ change => updateField( change, index ) }
          disableAutoJump={ disableAutoJump }
        />
      )
      }
      keyExtractor={(item, index) => `${ item.reps }${ index }`}
    />
  )
};


ExerciseInputTableBody.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      set: PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.number,
      ] ),
      reps:  PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.number,
      ] ),
      weight: PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.number,
      ] ),
    })
  ),
  updateField: PropTypes.func,
  disableAutoJump: PropTypes.bool,
};

export default ExerciseInputTableBody;
