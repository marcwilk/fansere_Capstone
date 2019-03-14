import React from "react"
import { View, Text } from "react-native"
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation"
import LogOut from './auth/logout'
import Chatdisplay from './chat/chatDisplay'
import Profiledisplay from './profile/profileDisplay'
import Feed from './feed/mainFeed'
import Maps from './maps/maps'

const TabNavigator = createBottomTabNavigator({
  Logout: { screen: props => <LogOut />},
  Chat: { screen: props => <Chatdisplay />},
  Profile: { screen: props => <Profiledisplay />},
  Map: { screen: props => <Maps />},
  Feed: { screen: props => <Feed />}
})

export default createAppContainer(TabNavigator);
