import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    backgroundColor: '#24292e',
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable
      onPress={console.log('hello there')}>
          <Text>Repositories</Text>
      </Pressable>
    </View>
  )
};

export default AppBar;