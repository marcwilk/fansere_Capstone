import React from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'
import firebase from 'firebase'

export default class LogOut extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  logOut() {
    firebase.auth().signOut()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Logged In</Text>
        <Button
          title="Log out"
          onPress={() => this.logOut()}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
