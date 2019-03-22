import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import Loading from './components/auth/Loading'
import Login from './components/auth/Login'
import Main from './components/auth/Main'
import SignUp from './components/auth/SignUp'
// import TabNavigator from './components/router'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBu6OQLFGgghbxr-i7jiIdMHoToNIf3nG0",
  databaseURL: "https://fansere-application.firebaseio.com",
  projectId: "fansere-application",
};
firebase.initializeApp(config);

const App = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)
const AppContainer = createAppContainer (App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default AppContainer
