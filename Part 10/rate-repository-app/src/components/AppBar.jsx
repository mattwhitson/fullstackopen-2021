import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from '../utils/Text';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    backgroundColor: '#24292e',
  },
  signIn: {
    textAlign: 'right'
  },
  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  linkStyle: {
    paddingRight: 20
  },
 
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} >
        <View style={styles.headerStyle}>
      <Link to='/'>
        <Text fontWeight="bold" color="primary" style={styles.linkStyle}>Repositories</Text>
      </Link>
      <Link to="/signin">
        <Text fontWeight="bold" color="primary" style={styles.linkStyle}>Sign In</Text>
      </Link>
      </View>
      </ScrollView>
    </View>
  )
};

export default AppBar;