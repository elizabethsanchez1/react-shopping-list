import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { StyledText } from '../Text';

import theme from '../../styles/theme.style';


const styles = StyleSheet.create({
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

  column: {

  },

  border: {
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    borderColor: theme.BORDER_COLOR,
    alignItems: 'center',
    paddingBottom: 5,
  },
});

const TrackExerciseHistoryTable = ( props) => {
  console.log('props in dynamic grid', props);
  let width = { width: `${100 /props.header.length}%`};
  let lastItem = props.header.length - 1;

  return (
    <View style={props.containerStyling}>
      <View style={styles.header}>
        {
          props.header.map((title, i) => (
            <StyledText
              style={
                (i === 0)
                  ? [width, styles.left]
                  : (i === lastItem)
                      ? [width, styles.right]
                      : [width, styles.center]
              }

              key={title}
            >
              {title}
            </StyledText>
          ))
        }
      </View>

      <View style={styles.table}>
        {
          props.data.map((item, index) => (

            <View style={styles.row} key={item + index}>
              {
                Object.keys(item).map((key, i) => (
                  <StyledText
                    key={item + index + key}
                    style={
                      (i === 0)
                        ? [width, styles.left]
                        : (i === lastItem)
                            ? [width, styles.right]
                            : [width, styles.center]
                    }
                  >
                    {item[key]}
                  </StyledText>
                ))
              }
            </View>

          ))
        }
      </View>

    </View>
  )
};


TrackExerciseHistoryTable.propTypes = {
  containerStyling: PropTypes.object,
  header: PropTypes.array,
  data: PropTypes.array,
};


export default TrackExerciseHistoryTable;
