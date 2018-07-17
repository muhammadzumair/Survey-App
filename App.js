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
import { Provider } from "react-redux";
import {store} from './src/Store/index';



export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <View style={{ flex: 1 }} >
          <Navigation />
        </View>
      </Provider>
    );
  }

}

const Navigation = StackNavigator(
  {
    firstScreen: FirstScreen,
    main: Main,
  },
  {
    initialRouteName: "firstScreen",
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    }

  }
)