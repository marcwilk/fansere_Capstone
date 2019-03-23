import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import firebase from 'firebase'
import 'firebase/firestore'
export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/splashpage.png')}/>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
          Welcome to Fansere!
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'black',
  }
})
