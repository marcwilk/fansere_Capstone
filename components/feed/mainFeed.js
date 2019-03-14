import React from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'
import firebase from 'firebase'

export default class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Feed</Text>
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
