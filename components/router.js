import React from "react"
import { View, Text } from "react-native"
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation"
import LogOut from './auth/logout'
import Chatdisplay from './chat/chatDisplay'
import Profiledisplay from './profile/profileDisplay'
import Feed from './feed/mainFeed'
import Maps from './maps/maps'

const TabNavigator = createBottomTabNavigator({
  Chat: { screen: props => <Chatdisplay />},
  Profile: { screen: props => <Profiledisplay />},
  Map: { screen: props => <Maps />},
  Users: { screen: props => <Feed />}
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

export default createAppContainer(TabNavigator);
