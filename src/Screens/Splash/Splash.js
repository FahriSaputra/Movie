import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const Splash = ({navigation}) => {
  useEffect(() => {
    NetInfo.fetch().then(state => {
      setTimeout(() => {
        state.isConnected
          ? navigation.replace('Home')
          : Alert.alert('Please check your network');
      }, 3000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie.com</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#023680',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Helvetica',
    fontSize: 30,
  },
});
