import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import theme from '../../styles/theme.style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.SECONDARY_BACKGROUND,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const Loading = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={theme.ACCENT_BLUE} />
    </View>
  );
};

export default Loading;
