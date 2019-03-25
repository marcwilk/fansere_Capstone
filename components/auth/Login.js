// Log in Logic
// import Button from "react-native-button";
import React from 'react'
import { StyleSheet, Text, TextInput, Image, View, Button } from 'react-native'
import firebase from 'firebase'
import { AsyncStorage } from "react-native";
import { AppStyles } from "../AppStyles";
const FBSDK = require("react-native-fbsdk");
const { LoginManager, AccessToken } = FBSDK;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email: "",
      password: "",
      errorMessage: null
    };
  }

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const { navigation } = this.props;
        user_uid = response.user._user.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(user_uid)
          .get()
          .then(function(user) {
            if (user.exists) {
              AsyncStorage.setItem("@loggedInUserID:id", user_uid);
              AsyncStorage.setItem("@loggedInUserID:key", email);
              AsyncStorage.setItem("@loggedInUserID:password", password);
              navigation.navigate('Main');
            } else {
              alert("User does not exist. Please try again.");
            }
          })
          .catch(function(error) {
            const { code, message } = error;
            alert(message);
          });
      })
      .catch(error => {
        const { code, message } = error;
        alert(message);
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  };
  //   const { email, password } = this.state
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(() => this.props.navigation.navigate('Main'))
  //     .catch(error => this.setState({ errorMessage: error.message }))
  // }
  onPressFacebook = () => {
    LoginManager.logInWithReadPermissions([
      "public_profile",
      "user_friends",
      "email"
    ]).then(
      result => {
        if (result.isCancelled) {
          alert("Whoops!", "You cancelled the sign in.");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const credential = firebase.auth.FacebookAuthProvider.credential(
              data.accessToken
            );
            const accessToken = data.accessToken;
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(result => {
                var user = result.user;
                AsyncStorage.setItem(
                  "@loggedInUserID:facebookCredentialAccessToken",
                  accessToken
                );
                AsyncStorage.setItem("@loggedInUserID:id", user.uid);
                var userDict = {
                  id: user.uid,
                  fullname: user.displayName,
                  email: user.email,
                  profileURL: user.photoURL
                };
                var data = {
                  ...userDict,
                  appIdentifier: "rn-android-universal-listings"
                };
                firebase
                  .firestore()
                  .collection("users")
                  .doc(user.uid)
                  .set(data);
                this.props.navigation.dispatch({
                  type: "Login",
                  user: userDict
                });
              })
              .catch(error => {
                // alert("Please try again! " + error);
              });
          });
        }
      },
      error => {
        Alert.alert("Sign in error", error);
      }
    );
  };
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.container0}>
          <Text style={styles.label}>Email:</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'white' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Please enter your email..."
            placeholderTextColor= "white"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Please enter your password..."
            placeholderTextColor= "white"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color="#7ed957"
            title="Login"
            onPress={() => this.handleLogin()}
          />
        </View>
        <View style={styles.buttonContainer2}>
          <Button
          color="#7ed957"
          title ="Login with Facebook"
          containerStyle={styles.facebookContainer}
          style={styles.facebookText}
          onPress={() => this.onPressFacebook()}
          />
        </View>
        <View style={styles.buttonContainer2}>
          <Button
          color="#7ed957"
          title ="Login with Google"
          containerStyle={styles.facebookContainer}
          style={styles.facebookText}
          onPress={() => this.onPressFacebook()}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color="#7ed957"
            title="Don't have an account? Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
        <View style={styles.image}>
        <Image source={require('../../images/login1.png')}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "black",
    paddingBottom: 150
  },
  container0:{
    alignItems: 'center'
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
  label: {
    padding: 10,
    paddingBottom: 10,
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    width: '100%',
    alignItems: 'center',
    },
  image: {
    paddingTop: 150,
    paddingRight: 230,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 4.0,
    alignItems: 'center',
    },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
})
