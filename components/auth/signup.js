import React from 'react'
import { View, StyleSheet, Text, TextInput, Image, Button } from 'react-native'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  inputEmail(email) {
    //console.log(email)
    this.setState({email: email})
  }

  inputPassword(password) {
    //console.log(password)
    this.setState({password: password})
  }

  logIn() {
    this.props.signIn(this.state.email, this.state.password)
    this.setState({email: '', password: ''})
  }

  signUp() {
    console.log(this.state.email, this.state.password)
    this.props.signUp(this.state.email, this.state.password)
    this.setState({email: '', password: ''})
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCorrect={false}
          placeholder='Please enter your email...'
          placeholderTextColor='white'
          style={styles.input}
          onChangeText={e => this.inputEmail(e)}
          value={this.state.email}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          autoCorrect={false}
          placeholder='Please enter your password...'
          placeholderTextColor='white'
          style={styles.input}
          onChangeText={e => this.inputPassword(e)}
          value={this.state.password}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
        <Button
          color="#7ed957"
          title="Login"
          onPress={()=> this.logIn()}
        />
        </View>
        <View style={styles.buttonContainer2}>
        <Button
          color="#7ed957"
          title="Sign Up"
          onPress={()=> this.signUp()}
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
    backgroundColor: 'black',
    marginTop: 40
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 40,
    marginBottom: 10,
    borderColor: "#7ed957",
    borderWidth: 2
  },
  buttonContainer2: {
    marginTop: 0,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
    borderColor: "#7ed957",
    borderWidth: 2
  },
  label: {
    padding: 10,
    paddingBottom: 10,
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    width: '100%',
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: 'white',
    fontSize: 18,
    width: '100%',
    borderColor: 'white',
    borderBottomWidth: 2,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 20
  }
})
