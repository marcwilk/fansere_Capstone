import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Content, Icon, Left, Body, Right, Button } from 'native-base'
import { Header, Card } from 'react-native-elements'
import Modal from 'react-native-modal'
import Teams from './teams'
import Roster from './roster'
import firebase from 'firebase'
import 'firebase/firestore'

export default class Profiledisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      isModalVisable: false,
      userId: 'M2j6TOA7rKYR1igv6CaVhyGHqcs1',
      username: null,
      location: null,
      tagline: null
    }
  }

  componentDidMount() {
     firebase.firestore().collection('users')
       .doc(this.state.userId)
       .onSnapshot(snapshot => {
         //console.log(snapshot.data())
         let data = snapshot.data()
         this.setState({location: data.location, tagline: data.tagline, username: data.username})
         //console.log(this.state.location)
       })
   }

  updateUsername = (text) => {
    this.setState({ username: text} )
  }

  updateLocation = (text) => {
    this.setState({ location: text })
  }

  updateTagline = (text) => {
    this.setState({ tagline: text })
  }

  submitProfile(newUsername, newLocation, newTagline){
    firebase.firestore().collection('users')
      .doc(this.state.userId)
      .set({
        username: newUsername,
        location: newLocation,
        tagline: newTagline
      })
  }

  logOut() {
    firebase.auth().signOut()
  }

  segmentClicked = (index) => {
    this.setState({
      activeIndex: index
    })
  }

  renderSection = () => {
    if (this.state.activeIndex == 0) {
      return (
        <Teams />
      )
    }
    if (this.state.activeIndex == 1) {
      return (
        <Roster />
      )
    }
  }

  _toggleModal = () =>
     this.setState({ isModalVisible: !this.state.isModalVisible })

  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: 'black' }}>
        <Header backgroundColor='#7ed957' placement='center' centerComponent={{ text: 'Profile', style: { color: 'white', fontSize: 20, fontWeight: 'bold' }}}/>
        <Content>
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Image source={require('../../images/logo.png')} style={{ width: 75, height: 75, borderRadius: 37.5, borderWidth: 2, borderColor: '#fff', }} />
              </View>
              <View style={{ flex: 3 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>20</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}>Roster</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>205</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}>Posts</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>167</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}>Check-Ins</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Button light style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30 }} onPress = { this._toggleModal }>
                      <Text style={{ color: 'black' }}>Edit Profile</Text>
                    </Button>
                    <Modal isVisible={this.state.isModalVisible}>
                    <View>
                      <Card containerStyle={{width: 350, padding: 10, backgroundColor: 'black'}}>
                        <Text style={{color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}> Edit Profile </Text>
                        <Text style={{color: 'white', fontSize: 16}}>
                          Username:
                        </Text>
                        <TextInput
                          underlineColorAndroid = 'transparent'
                          placeholder = {this.state.username}
                          placeholderTextColor = 'white'
                          autoCapitalize = 'none'
                          style={styles.textInput}
                          value = {this.state.username}
                          onChangeText={this.updateUsername}
                        />
                        <Text style={{color: 'white', fontSize: 16}}>
                          Location:
                        </Text>
                        <TextInput
                          underlineColorAndroid = 'transparent'
                          placeholder = {this.state.location}
                          placeholderTextColor = 'white'
                          autoCapitalize = 'none'
                          style={styles.textInput}
                          value = {this.state.location}
                          onChangeText={this.updateLocation}
                        />
                        <Text style={{color: 'white', fontSize: 16}}>
                          Tagline:
                        </Text>
                        <TextInput
                          underlineColorAndroid = 'transparent'
                          placeholder = {this.state.tagline}
                          placeholderTextColor = 'white'
                          autoCapitalize = 'none'
                          style={styles.textInput}
                          value = {this.state.tagline}
                          onChangeText={this.updateTagline}
                        />
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <Button light style={{ flex: 3, margin: 10, justifyContent: 'center', height: 30 }}
                          onPress= { () => this.submitProfile(this.state.username, this.state.location, this.state.tagline) }>
                          <Text style = {styles.submitButtonText}>Submit Changes</Text>
                        </Button>
                        <Button danger style={{ flex: 3, margin: 10, justifyContent: 'center', height: 30 }}
                          onPress= {this._toggleModal}>
                          <Text style= {styles.modalText }>Close</Text>
                        </Button>
                        </View>
                      </Card>
                      </View>
                    </Modal>
                    <Button danger style={{ flex: 1, height: 30, marginRight: 10, marginLeft: 5, justifyContent: 'center'}} onPress={() => this.logOut()}>
                      <Text style={{ color: 'black' }}>Logout</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>{this.state.username}</Text>
                <Text style={{ color: 'white' }}>{this.state.location}</Text>
                <Text style={{ color: 'white' }}>{this.state.tagline}</Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: 'black', backgroundColor: '#7ed957'}}>
                <Button transparent onPress={ () => this.segmentClicked(0) } active={ this.state.activeIndex == 0 }>
                  <Text style={[ this.state.activeIndex == 0 ? { color: 'white', fontSize: 16 } : { color: 'black', fontSize: 16 }]}>Teams</Text>
                </Button>
                <Button transparent onPress={ () => this.segmentClicked(1) } active={ this.state.activeIndex == 1 }>
                  <Text style={[ this.state.activeIndex == 1 ? { color: 'white', fontSize: 16 } : { color: 'black', fontSize: 16 }]}>Roster</Text>
                </Button>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderTopWidth: 1, backgroundColor: 'white', color: 'black'}}>
              {this.renderSection()}
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
    padding: 20,
    backgroundColor: 'black'
  },
  modalViewContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white'
  },
  modalText: {
    justifyContent: 'center',
    color: 'black'
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    color: 'black',
    backgroundColor: '#7ed957'
  },
  submitButtonText: {
    color: 'black'
  }
})
