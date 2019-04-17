import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet} from 'react-native';
import Text from '../../Text/Text';
import theme from "../../../styles/theme.style";

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },

  standardCell: {
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});


class ExerciseInputRow extends Component {
  constructor(props) {
    super(props);

    this.sets = React.createRef();
    this.reps = React.createRef();
  }

  render() {
    return (
      <View style={styles.row}>
        <View style={styles.standardCell}>
          <Text>{this.props.set}</Text>
        </View>


        {/*<View style={styles.standardCell}>*/}
        {/*<Text style={styles.text}>{this.props.previous}</Text>*/}
        {/*</View>*/}

        <View style={styles.standardCell}>
          <TextInput
            ref={this.weight}
            style={styles.number}
            keyboardType="number-pad"
            returnKeyType="done"
            clearTextOnFocus
            onEndEditing={value => this.props.onChange(
                {field: 'weight', value: value.nativeEvent.text, set: this.props.set}
              )
            }
            onSubmitEditing={
              (!this.props.disableAutoJump)
                ? () => this.reps.current.focus()
                : null
            }
            maxLength={3}
          >
            {this.props.weight}
          </TextInput>
        </View>

        <View style={styles.standardCell}>
          <TextInput
            ref={this.reps}
            style={styles.number}
            keyboardType="number-pad"
            returnKeyType="done"
            clearTextOnFocus
            maxLength={2}
            onEndEditing={value => this.props.onChange({field: 'reps', value: value.nativeEvent.text, set: this.props.set})}
          >
            {this.props.reps}
          </TextInput>
        </View>

      </View>
    );
  }
}

ExerciseInputRow.propTypes = {
  // previous: PropTypes.string,
  set: PropTypes.number,
  weight: PropTypes.any,
  reps: PropTypes.any,
  onChange: PropTypes.func,
  disableAutoJump: PropTypes.bool,
};

export default ExerciseInputRow;
