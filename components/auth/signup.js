// Login Sign Up pager
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
import firebase from 'firebase'

export default class SignUp extends React.Component {

  state = { email: '', password: '', errorMessage: null }

handleSignUp = () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(error => this.setState({ errorMessage: error.message }))
}
render() {

    return (
      <View style={styles.container}>
        <View style={styles.container0}>
          <Text style={styles.label}>Email:</Text>
          {this.state.errorMessage &&
            <Text style={styles.label}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            placeholder="Please enter your email..."
            placeholderTextColor= "white"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
           <Text style={styles.label}>Password:</Text>
          <TextInput
            secureTextEntry
            placeholder="Please enter your password..."
            placeholderTextColor= "white"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={styles.buttonContainer}>
        <Button
        color="#7ed957"
        title="Sign Up"
        onPress={this.handleSignUp} />
        </View>
        <View style={styles.buttonContainer2}>
        <Button
          color="#7ed957"
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        </View>
        <View style={styles.image}>
        <Image source={require('../../images/login.png')}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    color: "#7ed957"
  },
  container0:{
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'white',
    color: "white",
    paddingLeft: 10,
    borderWidth: 1,
    marginTop: 8,
    alignItems: 'center',
  },
  image: {
    paddingTop:80,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    alignItems: 'center',
    },
  label: {
    padding: 10,
    paddingBottom: 10,
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    width: '100%',
    alignItems: 'center',
    },
    buttonContainer: {
      margin: 40,
      marginBottom: 20,
      marginLeft: 40,
      marginRight: 40,
      borderColor: "#7ed957",
      borderWidth: 2,
    },
    buttonContainer2: {
      marginTop: 0,
      marginLeft: 40,
      marginRight: 40,
      borderColor: "#7ed957",
      borderWidth: 2,
    },
})
