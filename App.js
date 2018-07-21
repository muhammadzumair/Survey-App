/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import FirstScreen from './src/Screens/FirstScreen';
import Main from './src/Screens/Main';



export default class App extends Component {
  render() {
    return (
      <Navigation />
    );
  }

}

const Navigation = StackNavigator(
  {
    firstScreen: FirstScreen,
    main: Main,
  },
  {
    initialRouteName: "main",
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    }

  }
)