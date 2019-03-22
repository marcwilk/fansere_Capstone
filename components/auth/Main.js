// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import SplashScreen from './components/splashScreen'
import firebase from 'firebase'

export default class Main extends React.Component {
  state = { currentUser: null, userEmail:null, isLoading: true,  }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}
render() {
    const { currentUser } = this.state
    if(this.state.isLoading){
      return <SplashScreen />
    }
    return (
      <View style={styles.container}>
        {currentUser ? <TabNavigator/>}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
