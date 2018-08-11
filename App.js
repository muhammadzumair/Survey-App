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
import ServeyForm from './src/Screens/SurveyForm';
import AudioExample from './src/Screens/AudioRecord';
import Main from './src/Screens/Main';
import SurveyForm from './src/Screens/SurveyForm';
import ThankYouScreen from "./src/Screens/ThnakYouScreen";
import { Provider } from "react-redux";
import { store } from './src/Store/index';


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
    surveyForm:SurveyForm,
    main: Main,
    thankYouScreen:ThankYouScreen

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