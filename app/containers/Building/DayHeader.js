import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from '../../components/Form';
import { getBuildingDayTitle } from '../../selectors/building';
import { updateDayTitleAction } from '../../actions/building';

class DayHeader extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      title: props.dayTitle,
    };
  }

  render() {
    const { dayTitle, updateDayTitle, day } = this.props;

    return (
      <Input
        defaultValue={ dayTitle }
        clearTextOnFocus
        autoCapitalize="words"
        onEndEditing={
          event => updateDayTitle( {
            text: event.nativeEvent.text,
            index: day,
          } )
        }
        // placeholderTextColor='#A1A1A1'
      />
    );
  }
}

DayHeader.propTypes = {
  day: PropTypes.number,
  dayTitle: PropTypes.string,
  updateDayTitle: PropTypes.func,
};

const mapStateToProps = ( state, ownProps ) => ( {
  dayTitle: getBuildingDayTitle( state, ownProps.day ),
} );

const mapDispatchToProps = dispatch => ( {
  updateDayTitle: data => dispatch( updateDayTitleAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( DayHeader );
