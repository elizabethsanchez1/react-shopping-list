import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Card as CardComponent } from 'react-native-elements';
import BuildingBuildTable from '../Table/BuildingBuildTable';
import { Input } from '../Form';
import theme from '../../styles/theme.style';

const styles = StyleSheet.create( {
  titleStyle: {
    fontSize: theme.FONT_SIZE_HEADERBAR,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
    marginBottom: 0,
  },

  basicCard: {
    borderRadius: 4,
    backgroundColor: theme.SECONDARY_BACKGROUND,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
} );

const BuildingBuildCard = ( { day, updateDay, exercises, updateField, customSet, checkIfCustom } ) => {

  return (
    <CardComponent
      titleStyle={ styles.titleStyle }
      dividerStyle={ { display: 'none' } }
      containerStyle={ [ styles.basicCard, { marginTop: 30 } ] }
    >
      {/*<Input*/}
      {/*  defaultValue={ day }*/}
      {/*  onEndEditing={ text => updateDay( text.nativeEvent.text ) }*/}
      {/*  clearTextOnFocus*/}
      {/*  autoCapitalize="words"*/}
      {/*  // placeholderTextColor='#A1A1A1'*/}
      {/*/>*/}

      <BuildingBuildTable
        items={ exercises }
        updateField={ update => updateField( update ) }
        customSet={ index => customSet( index ) }
        checkIfCustom={
          ( exercise, exerciseSelected ) => checkIfCustom(
            exercise,
            exerciseSelected,
          )
        }
      />
    </CardComponent>
  );
};

BuildingBuildCard.propTypes = {
  day: PropTypes.string,
  updateDay: PropTypes.func,
  exercises: PropTypes.array,
  updateField: PropTypes.func,
  customSet: PropTypes.func,
  checkIfCustom: PropTypes.func,
};

export default BuildingBuildCard;
