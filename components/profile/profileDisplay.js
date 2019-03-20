import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, TextInput, Image } from 'react-native'
import { Button } from 'native-base'
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

    //get NHL teams
    firebase.firestore().collection('NHL Teams')
      .get().then(snapshot=> {
        snapshot.docs.forEach(doc=> {
          let nhlObj ={}
          nhlObj.team = doc.data().team,
          nhlObj.logo = doc.data().logo
          this.setState({NHLTeams:[...this.state.NHLTeams, nhlObj]})
      })
    })

    //get NFL teams
    firebase.firestore().collection('NFL Teams')
      .get().then(snapshot=> {
        snapshot.docs.forEach(doc=> {
          let nflObj ={}
          nflObj.team = doc.data().team,
          nflObj.logo = doc.data().logo
          this.setState({NFLTeams:[...this.state.NFLTeams, nflObj]})
      })
    })

    //get NBA teams
    firebase.firestore().collection('NBA Teams')
      .get().then(snapshot=> {
        snapshot.docs.forEach(doc=> {
          let nbaObj ={}
          nbaObj.team = doc.data().team,
          nbaObj.logo = doc.data().logo
          this.setState({NBATeams:[...this.state.NBATeams, nbaObj]})
      })
    })

    //get MLB teams
    firebase.firestore().collection('MLB Teams')
      .get().then(snapshot=> {
        snapshot.docs.forEach(doc=> {
          let mlbObj ={}
          mlbObj.team = doc.data().team,
          mlbObj.logo = doc.data().logo
          this.setState({MLBTeams:[...this.state.MLBTeams, mlbObj]})
      })
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

  toggleModal = () =>
     this.setState({ isModalVisible: !this.state.isModalVisible })

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Header backgroundColor='#7ed957' placement='center' centerComponent={{ text: 'Profile', style: { color: 'white', fontSize: 20, fontWeight: 'bold' }}}/>
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Image source={require('../../images/logo.png')} style={styles.profileImage} />
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
                    <Button light style={styles.editProfileButton} onPress = { this.toggleModal }>
                      <Text style={{ color: 'black' }}>Edit Profile</Text>
                    </Button>
                    <Modal isVisible={this.state.isModalVisible}>
                    <View>
                      <Card containerStyle={{width: 350, padding: 10, backgroundColor: 'black'}}>
                        <Text style={styles.editProfile}> Edit Profile </Text>
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
                        <Button light style={styles.button}
                          onPress= { () => this.submitProfile(this.state.username, this.state.location, this.state.tagline) }>
                          <Text style = {styles.submitButtonText}>Submit Changes</Text>
                        </Button>
                        <Button danger style={styles.button}
                          onPress= {this.toggleModal}>
                          <Text style= {styles.modalText }>Close</Text>
                        </Button>
                        </View>
                      </Card>
                      </View>
                    </Modal>
                    <Button danger style={styles.logout} onPress={() => this.logOut()}>
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
              <View style={styles.teamsRoster}>
                <Button transparent onPress={ () => this.segmentClicked(0) } active={ this.state.activeIndex == 0 }>
                  <Text style={[ this.state.activeIndex == 0 ? { color: 'white', fontSize: 16 } : { color: 'black', fontSize: 16 }]}>Teams</Text>
                </Button>
                <Button transparent onPress={ () => this.segmentClicked(1) } active={ this.state.activeIndex == 1 }>
                  <Text style={[ this.state.activeIndex == 1 ? { color: 'white', fontSize: 16 } : { color: 'black', fontSize: 16 }]}>Roster</Text>
                </Button>
              </View>
            </View>
            <ScrollView style={styles.scrollView}>
              {this.renderSection()}
            </ScrollView>
          </View>
      </View>
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
  scrollView: {
    marginBottom: 275,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 2,
    borderColor: '#fff'
  },
  editProfileText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  editProfileButton: {
    flex: 3,
    marginLeft: 10,
    justifyContent: 'center',
    height: 30
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
  button: {
    flex: 3,
    margin: 10,
    justifyContent: 'center',
    height: 30
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
  },
  teamsRoster: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'black',
    backgroundColor: '#7ed957'
  },
  logout: {
    flex: 1,
    height: 30,
    marginRight: 10,
    marginLeft: 5,
    justifyContent: 'center'
  }
})
