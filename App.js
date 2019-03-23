
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base'
import firebase from 'firebase'
import { createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import LogOut from './components/auth/logout'
import Chatdisplay from './components/chat/chatDisplay'
import Profiledisplay from './components/profile/profileDisplay'
import Feed from './components/feed/mainFeed'
import Maps from './components/maps/maps'
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

console.disableYellowBox = true;

const TabNavigator = createBottomTabNavigator({
  // Main: { screen: props => <Main />},
  Profile: { screen: props => <Profiledisplay />},
  Chat: { screen: props => <Chatdisplay />},
  Map: { screen: props => <Maps />},
  Feed: { screen: props => <Feed />}
},
{
tabBarOptions: {
    activeTintColor: '#7ed957',
    inactiveTintColor: '#ffffff',
    labelStyle: {
    fontSize: 14,
    },
    style: {
    backgroundColor: '#545454',
    color: '#7ed957',
    paddingTop: 5
   },
 },
}




)

const App = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main,
    TabNavigator
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
