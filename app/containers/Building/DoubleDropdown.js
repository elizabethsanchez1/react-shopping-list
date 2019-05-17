import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { BuildingBuildDropdown } from '../../components/Form';
import { PrimaryButton } from '../../components/Button';
import { copyBuildObjectAction } from '../../actions/building';


const styles = StyleSheet.create( {
  button: {
    padding: 10,
  },
  buttonContainer: {
    width: '40%',
    alignSelf: 'flex-end',
  },
} );

class DoubleDropdown extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      weeksDropdown: [],
      copyFrom: '',
      copyTo: '',
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const updatedWeeks = JSON.parse( JSON.stringify( data ) );
    updatedWeeks.unshift( { value: 'All Weeks' } );
    this.setState( {
      weeksDropdown: updatedWeeks,
    } );
  }


  render() {
    const { copyFrom, copyTo } = this.state;
    const { copyData } = this.props;

    console.log( 'Double dropdown state: ', this.state );
    return (
      <View>
        <BuildingBuildDropdown
          dropdown1Data={ this.props.data }
          dropdown2Data={ this.state.weeksDropdown }
          onChange={ update => this.setState( update ) }
        />

        {
          ( copyFrom !== '' && copyTo !== '' )
          && (
            <PrimaryButton
              buttonStyle={ styles.button }
              containerViewStyle={ styles.buttonContainer }
              title="COPY DATA"
              onPress={ () => copyData( { copyFrom, copyTo } ) }
            />
          )
        }
      </View>
    );
  }
}

DoubleDropdown.propTypes = {
  data: PropTypes.array,
  copyData: PropTypes.func,
};

const mapStateToProps = state => ( {} );

const mapDispatchToProps = dispatch => ( {
  copyData: data => dispatch( copyBuildObjectAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( DoubleDropdown );
