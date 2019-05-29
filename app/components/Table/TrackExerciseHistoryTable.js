import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { StyledText } from '../Text';

import theme from '../../styles/theme.style';


const styles = StyleSheet.create( {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    borderColor: theme.BORDER_COLOR,
    paddingBottom: 5,
  },
  table: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingBottom: 10,
    paddingTop: 15,
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
  center: {
    textAlign: 'center',
  },
  column: {},
  border: {
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    borderColor: theme.BORDER_COLOR,
    alignItems: 'center',
    paddingBottom: 5,
  },
  container: {
    marginBottom: 40,
  },
} );

let keyCount = 1000;
const getKey = () => keyCount += 1;

const TrackExerciseHistoryTable = ( { header, data, containerStyling } ) => {
  console.log( 'what is in data: ', data );
  const width = { width: `${ 100 / header.length }%` };
  const lastItem = header.length - 1;

  return (
    <View style={ [ styles.container, containerStyling ] }>
      <View style={ styles.header }>
        {
          header.map( ( title, i ) => (
            <StyledText
              style={
                ( i === 0 )
                  ? [ width, styles.left ]
                  : ( i === lastItem )
                    ? [ width, styles.right ]
                    : [ width, styles.center ]
              }
              key={ title }
            >
              { title }
            </StyledText>
          ) )
        }
      </View>

      <View style={ styles.table }>
        <View style={ styles.row }>
          {
            Object.keys( data ).map( ( key, index ) => (
              <StyledText
                key={ getKey() }
                style={
                  ( index === 0 )
                    ? [ width, styles.left ]
                    : ( index === lastItem )
                      ? [ width, styles.right ]
                      : [ width, styles.center ]
                }
              >
                { data[ key ] }
              </StyledText>
            ) )
          }
        </View>
      </View>

    </View>
  );
};


TrackExerciseHistoryTable.propTypes = {
  containerStyling: PropTypes.object,
  header: PropTypes.array,
  data: PropTypes.object,
};


export default TrackExerciseHistoryTable;
