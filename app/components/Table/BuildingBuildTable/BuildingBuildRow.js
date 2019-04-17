import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet} from 'react-native';
import { Text }  from '../../Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from "../../../styles/theme.style";


const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },

  padding: {
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
  },

  smallCell: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  lastCell: {
    paddingRight: 0,
    // paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '10%',
  },

  number: {
    color: theme.PRIMARY_FONT_COLOR,
    fontFamily: theme.SECONDARY_FONT_FAMILY,
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    minWidth: '80%',
    textAlign: 'center',
  },

  exerciseCell: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '35%',
  },

  standardCell: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  }
});

class BuildingBuildRow extends Component {
  constructor( props ) {
    super( props );

    this.sets = React.createRef();
    this.reps = React.createRef();
  }


  render() {
    const {  reps } = this.props;

    return (
      <View style={ styles.row }>
        <View style={[ styles.padding, styles.exerciseCell ]}>
          <Text size='small'> { this.props.exercise } </Text>
        </View>

        <View style={[ styles.padding, styles.standardCell ]}>
          <TextInput
            style={ styles.number }
            keyboardType="number-pad"
            returnKeyType="done"
            onFocus={ () => this.props.checkIfCustom() }
            onEndEditing={ weight => this.props.updateField({
                field: 'weight',
                value: weight.nativeEvent.text
              })
            }
            onSubmitEditing={ () => this.sets.current.focus() }
          >
            { this.props.weight }
          </TextInput>
        </View>

        <View style={ [ styles.padding, styles.smallCell ] }>
          <TextInput
            ref={ this.sets }
            style={ styles.number }
            keyboardType="number-pad"
            returnKeyType="done"
            onFocus={ () => this.props.checkIfCustom() }
            onEndEditing={ sets  => this.props.updateField({
                field: 'sets',
                value: sets.nativeEvent.text
              })
            }
            onSubmitEditing={ () => this.reps.current.focus() }
          >
            { this.props.sets }
          </TextInput>
        </View>

        <View style={[styles.padding, styles.standardCell ]}>
          <TextInput
            ref={ this.reps }
            style={ styles.number }
            keyboardType="number-pad"
            returnKeyType="done"
            onFocus={ () => this.props.checkIfCustom() }
            onEndEditing={ reps => this.props.updateField({
                field: 'reps',
                value: reps.nativeEvent.text
              })
            }
          >
            { this.props.reps }
          </TextInput>
        </View>

        <View style={[ styles.padding, styles.lastCell ]}>
          <Icon
            name="create"
            size={ 20 }
            color={ theme.EDIT_ICON_COLOR }
            onPress={ () => this.props.customSet() }
          />
        </View>

      </View>
    )
  }
}

BuildingBuildRow.propTypes = {
  exercise: PropTypes.string,
  weight: PropTypes.string,
  sets: PropTypes.string,
  reps: PropTypes.string,
  updateField: PropTypes.func,
  customSet: PropTypes.func,
  checkIfCustom: PropTypes.func,
};

export default BuildingBuildRow
