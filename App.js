import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base'
import firebase from 'firebase'
import SignUp from './components/auth/signup'
import TabNavigator from './components/router'
import SplashScreen from './components/splashScreen'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBu6OQLFGgghbxr-i7jiIdMHoToNIf3nG0",
  databaseURL: "https://fansere-application.firebaseio.com",
  projectId: "fansere-application",
};
firebase.initializeApp(config);

console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: null,
      userId: null,
      isLoading: true
    }
    //this.authCheck = this.authCheck.bind(this)
    //this.toggleLogin = this.toggleLogin.bind(this)
    this.signIn = this.signIn.bind(this)
  }

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

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email)
        console.log(user.uid)
        this.setState({userId: user.uid})
        this.setState({userEmail: user.email})
      } else {
        console.log('no user signed in')
        this.setState({userEmail: null})
      }
      })
  }

  signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        // ...
      })
  }

  signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
      // ...
    })
  }

  render() {
    if(this.state.isLoading){
      return <SplashScreen />
    }
    return (
      <View style={styles.container}>
        {this.state.userEmail ? <TabNavigator screenProps={{userId: this.state.userId}}/> : <SignUp signIn={this.signIn} signUp={this.signUp} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'black'
  },
});
