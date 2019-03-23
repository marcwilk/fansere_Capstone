// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import SplashScreen from '../splashScreen'
import firebase from 'firebase'
export default class Main extends React.Component {
  state = { currentUser: null, userEmail:null, isLoading: true,  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }
async componentDidMount() {
    this.authListener()
    const data = await this.performTimeConsumingTask();
      if (data !==null) {
      this.setState({ isLoading:false})
      }
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}
authListener() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.email)
      console.log(user.uid)
      this.setState({userEmail: user.email})
      this.setState({userId: user.uid})
      console.log(this.state.userId)

    } else {
      console.log('no user signed in')
      this.setState({userEmail: null})
    }
    })
}
render() {
    const { currentUser } = this.state
    if(this.state.isLoading){
      return <SplashScreen />
    }
    return (
      <View style={styles.container}
      onLayout={() => this.props.navigation.navigate('TabNavigator')}>
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
