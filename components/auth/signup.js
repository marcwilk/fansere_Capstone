import React from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'

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
    this.props.signUp(this.state.email, this.state.password)
    this.setState({email: '', password: ''})
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCorrect={false}
          placeholder={'Please enter your email...'}
          style={styles.input}
          onChangeText={e => this.inputEmail(e)}
          value={this.state.email}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          autoCorrect={false}
          placeholder={'Please enter your password...'}
          style={styles.input}
          onChangeText={e => this.inputPassword(e)}
          value={this.state.password}
          secureTextEntry
        />
        <Button
          title="Login"
          onPress={()=> this.logIn()}
        />
        <Button
          title="Sign Up"
          onPress={()=> this.signUp()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
    padding: 20,
  },
  label: {
    padding: 5,
    paddingBottom: 5,
    color: 'blue',
    fontSize: 17,
    fontWeight: '700',
    width: '100%'
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#333',
    fontSize: 18,
    //fontWeight: '700',
    width: '100%',
    borderColor: '#ccc',
    borderBottomWidth: 2
  }
})
