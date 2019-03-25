
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Container, Content, Thumbnail, Header, Left, Right, Body } from 'native-base'
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
import SignUp from './components/auth/signup'
import Icon from 'react-native-vector-icons/FontAwesome'
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
    Profile: { screen: props => <Profiledisplay />},
    Chat: { screen: props => <Chatdisplay />},
    Map: { screen: props => <Maps />},
    Users: { screen: props => <Feed />}
},
{
  initialRouteName: 'Profile',
  defaultNavigationOptions: ({ navigation }) => ({
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    const { routeName } = navigation.state;
    let IconComponent = Icon;
    let iconName;
    if (routeName === 'Profile') {
      iconName = 'user';
    } else if (routeName === 'Chat') {
      iconName = 'comments';
    }
    else if (routeName === 'Map') {
      iconName = 'map-marker';
    }
    else if (routeName === 'Users') {
      iconName = 'user-plus';
    }
    return <IconComponent name={iconName} size={22} color={tintColor} paddingTop={10} />;
    },
  }),
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
 container: {
   flex: 1,
   backgroundColor: 'black',
   color: 'black'
 },
}
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

// const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: 'black',
  //   color: 'black'
  // },
//   style: {
//     backgroundColor: '#545454'
//   }
// });

export default AppContainer
