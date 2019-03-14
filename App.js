import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase'
import SignUp from './components/auth/signup'
import TabNavigator from './components/router'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBu6OQLFGgghbxr-i7jiIdMHoToNIf3nG0",
  databaseURL: "https://fansere-application.firebaseio.com",
  projectId: "fansere-application",
};
firebase.initializeApp(config);

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: null,
      userId: null
    }
    this.signIn = this.signIn.bind(this)
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({userEmail: user.email})
        this.setState({userId: user.uid})
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
    return (
      <View style={styles.container}>
        {this.state.userEmail ? <TabNavigator /> : <SignUp signIn={this.signIn} signUp={this.signUp} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
