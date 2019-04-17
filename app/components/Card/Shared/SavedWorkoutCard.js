import PropTypes from 'prop-types';
import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Card as CardComponent } from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle'
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';
import theme from '../../../styles/theme.style';

const SavedWorkoutCard = ( {
                       title,
                       description,
                       createdDate,
                       onClick,
                       secondaryClick,
                       showPercentage,
                       hideRightIcons,
                     }) => {

  if (hideRightIcons) {
    return (
      <TouchableOpacity onPress={() => onClick()}>
        <CardComponent
          titleStyle={styles.titleStyle}
          dividerStyle={{ display: 'none' }}
          containerStyle={[styles.basicCard, {marginTop: 30}]}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.workoutCardHeader}>{title}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.text, { marginRight: 20 }]}>{description}</Text>
                <Text style={styles.text}>Created: {createdDate}</Text>
              </View>
            </View>
          </View>
        </CardComponent>
      </TouchableOpacity>
    )
  }

  if (showPercentage >= 0) {
    return (
        <CardComponent
          titleStyle={styles.titleStyle}
          dividerStyle={{ display: 'none' }}
          containerStyle={[styles.basicCard, {marginTop: 30, padding: 0}]}
        >
          <View style={{padding: 15}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.workoutCardHeader}>{title}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.text, { marginRight: 20 }]}>{description}</Text>
                  <Text style={styles.text}>Created: {createdDate}</Text>
                </View>
              </View>

              <View>
                <ProgressCircle
                  percent={showPercentage}
                  radius={40}
                  borderWidth={4}
                  color="#3399FF"
                  shadowColor="#999"
                  bgColor="#fff"
                  containerStyle={{
                    width: 65,
                    height: 65,
                    backgroundColor: theme.SECONDARY_BACKGROUND
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white'
                    }}
                  >
                    {showPercentage}%
                  </Text>
                </ProgressCircle>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: '50%',
                borderTopWidth: 2,
                borderRightWidth: 1,
                borderColor: theme.PRIMARY_BACKGROUND,
                paddingTop: 7,
                paddingBottom: 7,
              }}
            >
              <Button
                title='Options'
                onPress={() => secondaryClick()}
                color={theme.ACTIVE_TAB_COLOR}
              />
            </View>
            <View
              style={{
                width: '50%',
                borderTopWidth: 2,
                borderLeftWidth: 1,
                borderColor: theme.PRIMARY_BACKGROUND,
                paddingTop: 7,
                paddingBottom: 7,
              }}
            >
              <Button
                title='Track'
                onPress={() => onClick()}
                color={theme.ACTIVE_TAB_COLOR}
              />
            </View>

          </View>

        </CardComponent>
     )
  }


  return (
    <TouchableOpacity onPress={() => onClick()}>
      <CardComponent
        titleStyle={styles.titleStyle}
        dividerStyle={{ display: 'none' }}
        containerStyle={[styles.basicCard, {marginTop: 30}]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


          <View style={{ flexDirection: 'column' }}>

            <Text style={styles.workoutCardHeader}>{title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.text, { marginRight: 20 }]}>{description}</Text>
              <Text style={styles.text}>Created: {createdDate}</Text>
            </View>

          </View>

          <View>
            <Icon
              name='create'
              size={22}
              color={theme.EDIT_ICON_COLOR}
              // onPress={() => onClick(title)}
            />
          </View>
        </View>
      </CardComponent>
    </TouchableOpacity>
  )
};

SavedWorkoutCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  createdDate: PropTypes.string,
  onClick: PropTypes.func,
  showPercentage: PropTypes.any,
  hideRightIcons: PropTypes.bool,
};

export default SavedWorkoutCard;
