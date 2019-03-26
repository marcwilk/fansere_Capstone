import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, TextInput, Image, Alert } from 'react-native'
import { Container, Content, Picker, Form, Button } from 'native-base'
import { Header, Card, ListItem, Avatar } from 'react-native-elements'
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
      userId: `${this.props.userId}`,
      username: null,
      location: "New York",
      tagline: null,
      picture: null,
      NHLTeams: [],
      NFLTeams: [],
      NBATeams: [],
      MLBTeams: [],
      isSportsModalVisible: false,
      isNhlModalVisible: false,
      isNflModalVisible: false,
      isNbaModalVisible: false,
      isMlbModalVisible: false,

    }
  }

  componentDidMount() {
       firebase.firestore().collection('users')
         .doc(this.state.userId)
         .onSnapshot(snapshot => {
           //console.log(snapshot.data())
           let data = snapshot.data()
           this.setState({location: data.location, tagline: data.tagline, username: data.username, picture: data.picture})
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
//change user location
  onValueChange(value: string) {
   this.setState({
     location: value
   });
 }

  //updateLocation = (text) => {
  //  this.setState({ location: text })
  //}

  updateTagline = (text) => {
    this.setState({ tagline: text })
  }

  updatePicture = (text) => {
    this.setState({ picture: text })
  }

  submitProfile(newUsername, newLocation, newTagline, newPicture){
    firebase.firestore().collection('users')
      .doc(this.state.userId)
      .set({
        username: newUsername,
        location: newLocation,
        tagline: newTagline,
        picture: newPicture
      }, {merge: true})
  }
//submits user's nhl team to DB
  submitNhlTeam(userNhlTeamObj){
    firebase.firestore().collection('users')
      .doc(this.state.userId)
      .set({

          nhlTeamName: userNhlTeamObj.nhlTeam,
          nhlTeamLogo: userNhlTeamObj.nhlLogo

      }, {merge: true})
  }

  submitNbaTeam(userNbaTeamObj){
    firebase.firestore().collection('users')
      .doc(this.state.userId)
      .set({

          nbaTeamName: userNbaTeamObj.nbaTeam,
          nbaTeamLogo: userNbaTeamObj.nbaLogo

      }, {merge: true})
  }

  submitMlbTeam(userMlbTeamObj){
    firebase.firestore().collection('users')
      .doc(this.state.userId)
      .set({

          mlbTeamName: userMlbTeamObj.mlbTeam,
          mlbTeamLogo: userMlbTeamObj.mlbLogo

      }, {merge: true})
  }

  submitNflTeam(userNflTeamObj){
    firebase.firestore().collection('users')
      .doc(this.state.userId)
      .set({

          nflTeamName: userNflTeamObj.nflTeam,
          nflTeamLogo: userNflTeamObj.nflLogo

      }, {merge: true})
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
        <Teams  userId={this.state.userId} picture={this.state.picture}/>
      )
    }
    if (this.state.activeIndex == 1) {
      return (
        <Roster userId={this.state.userId} picture={this.state.picture}/>
      )
    }
  }

  toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  toggleSportsModal = () =>{
     this.setState({ isSportsModalVisible: !this.state.isSportsModalVisible })
   }

   onPressNhlListItem=()=>{
    this.setState({isNhlModalVisible: !this.state.isNhlModalVisible})
  }

  onPressNflListItem=()=>{
      this.setState({isNflModalVisible: !this.state.isNflModalVisible})
  }

  onPressNbaListItem=()=>{
      this.setState({isNbaModalVisible: !this.state.isNbaModalVisible})
  }

  onPressMlbListItem=()=>{
      this.setState({isMlbModalVisible: !this.state.isMlbModalVisible})
  }
//the following 4 functions format data and send them up to submitLeagueNameTeam functions.
onPressNbaTeam=(info)=>{
  userNbaTeamObj ={}
  userNbaTeamObj.nbaTeam =info.team,
  userNbaTeamObj.nbaLogo = info.logo,
  Alert.alert( `Hey ${this.state.username}!`, `are you sure you want to add the ${info.team} to your roster`,
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => this.submitNbaTeam(userNbaTeamObj)},
  ],
  {cancelable: false},
)
}

onPressNhlTeam=(info)=>{
  userNhlTeamObj ={}
  userNhlTeamObj.nhlTeam =info.team,
  userNhlTeamObj.nhlLogo = info.logo,
  Alert.alert( `Hey ${this.state.username}!`, `are you sure you want to add the ${info.team} to your roster`,
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => this.submitNhlTeam(userNhlTeamObj)},
  ],
  {cancelable: false},
)
}

onPressNflTeam=(info)=>{
  userNflTeamObj ={}
  userNflTeamObj.nflTeam =info.team,
  userNflTeamObj.nflLogo = info.logo,
  Alert.alert( `Hey ${this.state.username}!`, `are you sure you want to add the ${info.team} to your roster`,
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Ok', onPress: () => this.submitNflTeam(userNflTeamObj) },
  ],
  {cancelable: false},
)
}

onPressMlbTeam=(info)=>{
  userMlbTeamObj ={}
  userMlbTeamObj.mlbTeam =info.team,
  userMlbTeamObj.mlbLogo = info.logo,
  Alert.alert( `Hey ${this.state.username}!`, `are you sure you want to add the ${info.team} to your roster`,
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => this.submitMlbTeam(userMlbTeamObj)},
  ],
  {cancelable: false},
)
}


//Render NBA Teams
  renderNbaTeams=()=>{
  return this.state.NBATeams.map((info, i) =>
      <View>
        <ListItem
          key={i}
          title={info.team}
          leftAvatar ={<Avatar rounded large source={{uri: info.logo}} height={80} width={80}  aspectRatio={1.5}/>}
          avatarStyle={styles.avatar}
          style={styles.list}
          onPress={e => this.onPressNbaTeam(info)}
          containerStyle={{backgroundColor: 'black'}}
          titleStyle={{ color: 'white', fontWeight: 'bold' }}
          chevron chevronColor="black"
        />

      </View>)
  }
  //Render NHL Teams
  renderNhlTeams=()=>{
  return this.state.NHLTeams.map((info, i) =>
      <View>
        <ListItem
          key={i}
          title={info.team}
          leftAvatar ={<Avatar rounded large source={{uri: info.logo}} height={80} width={80}  aspectRatio={1.5}/>}
          style={styles.list}
          onPress={e => this.onPressNhlTeam(info)}
          containerStyle={{backgroundColor: 'black'}}
          titleStyle={{ color: 'white', fontWeight: 'bold' }}
          chevron chevronColor="black"
        />

      </View>)
  }
//Render NFL Teams
  renderNflTeams=()=>{
  return this.state.NFLTeams.map((info, i) =>
      <View>
        <ListItem
          key={i}
          title={info.team}
          leftAvatar ={<Avatar rounded large source={{uri: info.logo}} height={80} width={80}  aspectRatio={1.5}/>}
          style={styles.list}
          onPress={e => this.onPressNflTeam(info)}
          containerStyle={{backgroundColor: 'black'}}
          titleStyle={{ color: 'white', fontWeight: 'bold' }}
          chevron chevronColor="black"
        />
      </View>)
  }
//Render MLB Teams
  renderMlbTeams=()=>{
  return this.state.MLBTeams.map((info, i) =>
      <View>
        <ListItem
          key={i}
          title={info.team}
          leftAvatar ={<Avatar rounded large source={{uri: info.logo}} height={80} width={80}  aspectRatio={1.5}/>}
          style={styles.list}
          onPress={e => this.onPressMlbTeam(info)}
          containerStyle={{backgroundColor: 'black'}}
          titleStyle={{ color: 'white', fontWeight: 'bold' }}
          chevron chevronColor="black"
        />

      </View>)
  }



  render() {

    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Header backgroundColor='#7ed957' placement='center' centerComponent={{ text: 'Profile', style: { color: 'white', fontSize: 20 }}}/>
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Image source={{uri: `${this.state.picture}`}} style={styles.profileImage} />
              </View>
              <View style={{ flex: 3 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>4</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}>Teams</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>205</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}>Roster</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>167</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}>Users</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Button light style={styles.editProfileButton} onPress = { this.toggleModal }>
                      <Text style={{ color: 'black' }}>Edit Profile</Text>
                    </Button>
                    <Modal isVisible={this.state.isModalVisible}>
                    <View style={{alignItems: 'center'}}>
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
                        <Text style={{color: 'white', fontSize: 16}}>
                          Picture (url):
                        </Text>
                        <TextInput
                          underlineColorAndroid = 'transparent'
                          placeholder = {this.state.picture}
                          placeholderTextColor = 'white'
                          autoCapitalize = 'none'
                          style={styles.textInput}
                          value = {this.state.picture}
                          onChangeText={this.updatePicture}
                        />
                        <Text style={{color: 'white', fontSize: 16}}>
                          Location:
                        </Text>
                          <View style={{paddingLeft: 10, paddingTop: 10}}>
                            <Picker
                              mode="dropdown"
                              style={{ width: 310, height: 35, borderColor: 'white', borderWidth: 1, color: 'black', fontSize: 12, backgroundColor: '#7ed957' }}
                              selectedValue={this.state.location}
                              onValueChange={this.onValueChange.bind(this)}
                            >
                              <Picker.Item label="Denver" value="Denver" />
                              <Picker.Item label="New York" value="New York" />
                              <Picker.Item label="Atlanta" value="Atlanta" />
                              <Picker.Item label="Miami" value="Miami" />
                              <Picker.Item label="Los Angeles" value="Los Angeles" />
                            </Picker>
                            </View>


                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <Button light style={styles.submitButton}
                          onPress= { () => this.submitProfile(this.state.username, this.state.location, this.state.tagline, this.state.picture) }>
                          <Text style = {styles.submitButtonText}>Submit Changes</Text>
                        </Button>
                        <Button style={styles.closeButton}
                          onPress= {this.toggleModal}>
                          <Text style= {styles.modalText }>Close</Text>
                        </Button>
                        </View>
                      </Card>
                      </View>
                    </Modal>
                    <Button light style={styles.editTeamsButton} onPress={this.toggleSportsModal}>
                      <Text style={{ color: 'black' }}>Edit Teams</Text>
                    </Button>


                    <Modal isVisible={this.state.isSportsModalVisible} style={{paddingRight: 30}}>
                      <Card containerStyle={{width: "100%", height: "50%",  backgroundColor: 'black'}}>
                        <View>
                          <ListItem leftAvatar={{source:require('../../images/nhl.gif')}} style={styles.list} containerStyle={{backgroundColor: 'black'}}  chevron chevronColor="black" title={'NHL '} titleStyle={{ color: 'white', fontWeight: 'bold' }} onPress={e => this.onPressNhlListItem()} isVisible={this.state.isSportsModalVisible}/>
                          <ListItem leftAvatar={{source:require('../../images/nfl.gif')}} style={styles.list} containerStyle={{backgroundColor: 'black'}}  chevron chevronColor="black" title={'NFL '} titleStyle={{ color: 'white', fontWeight: 'bold' }} onPress={e => this.onPressNflListItem()} isVisible={this.state.isSportsModalVisible}/>
                          <ListItem leftAvatar={{source:require('../../images/mlb.gif')}} style={styles.list} containerStyle={{backgroundColor: 'black'}}  chevron chevronColor="black" title={'MLB '} titleStyle={{ color: 'white', fontWeight: 'bold' }} onPress={e => this.onPressMlbListItem()} isVisible={this.state.isSportsModalVisible}/>
                          <ListItem leftAvatar={{source:require('../../images/nba.gif')}} style={styles.list} containerStyle={{backgroundColor: 'black'}}  chevron chevronColor="black" title={'NBA '} titleStyle={{ color: 'white', fontWeight: 'bold' }} onPress={e => this.onPressNbaListItem()} isVisible={this.state.isSportsModalVisible}/>
                          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Button style={styles.addTeamsButton} isVisible={this.state.isSportsModalVisible} onPress={this.toggleSportsModal}>
                              <Text style={{color: 'black'}}>Close</Text>
                            </Button>
                          </View>
                        </View>
                        </Card>

                        <Modal isVisible={this.state.isNflModalVisible} style={{paddingRight: 30}}>
                          <Card containerStyle={{width: "100%", height: "60%", paddingBottom: 25, backgroundColor: 'black'}}>
                          <Button style={styles.closeTeamsButton}  onPress={this.onPressNflListItem} >
                            <Text style={{color: 'black'}}>Close</Text>
                          </Button>
                          <ScrollView style={{paddingBottom: 20}}>
                             {this.renderNflTeams()}
                          </ScrollView>
                        </Card>
                      </Modal>

                      <Modal isVisible={this.state.isNhlModalVisible} style={{paddingRight: 30}}>
                        <Card containerStyle={{width: "100%", height: "60%", paddingBottom: 25, backgroundColor: 'black'}}>
                        <Button style={styles.closeTeamsButton}  onPress={this.onPressNhlListItem} >
                          <Text style={{color: 'black'}}>Close</Text>
                          </Button>
                          <ScrollView>
                            {this.renderNhlTeams()}
                          </ScrollView>
                      </Card>
                    </Modal>

                    <Modal isVisible={this.state.isMlbModalVisible} style={{paddingRight: 30}}>
                      <Card containerStyle={{width: "100%", height: "60%", paddingBottom: 25, backgroundColor: 'black'}}>
                      <Button style={styles.closeTeamsButton}  onPress={this.onPressMlbListItem} >
                        <Text style={{color: 'black'}}>Close</Text>
                        </Button>
                        <ScrollView>
                            {this.renderMlbTeams()}
                        </ScrollView>

                    </Card>
                  </Modal>

                  <Modal isVisible={this.state.isNbaModalVisible} style={{paddingRight: 30}}>
                    <Card containerStyle={{width: "100%", height: "60%", paddingBottom: 25, backgroundColor: 'black'}}>
                    <Button style={styles.closeTeamsButton}  onPress={this.onPressNbaListItem} >
                      <Text style={{color: 'black'}}>Close</Text>
                      </Button>
                      <ScrollView>
                          {this.renderNbaTeams()}
                      </ScrollView>

                  </Card>
                </Modal>


                    </Modal>




                    <Button style={styles.logout} onPress={() => this.logOut()}>
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
    borderColor: '#7ed957'
  },
  editProfileText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  editProfileButton: {
    flex: 2,
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
  submitButton: {
    flex: 3,
    margin: 10,
    justifyContent: 'center',
    height: 30,
    backgroundColor: 'white'
  },
  closeButton: {
    flex: 3,
    margin: 10,
    justifyContent: 'center',
    height: 30,
    backgroundColor: '#7ed957'
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    color: 'black',
    backgroundColor: '#7ed957',
    borderRadius: 5
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
    justifyContent: 'center',
    backgroundColor: '#7ed957',
  },
  editTeamsButton: {
    flex: 2,
    marginLeft: 5,
    justifyContent: 'center',
    height: 30,
    color: 'black'
  },
  addTeamsButton: {
    flex: 2,
    marginLeft: 5,
    justifyContent: 'center',
    height: 30,
    backgroundColor: '#7ed957',
    color: 'black'
  },
  closeTeamsButton: {
    marginLeft: 5,
    justifyContent: 'center',
    height: 25,
    width: 50,
    backgroundColor: '#7ed957'
  },
  list: {
    borderWidth: .5,
    borderColor: "rgb(126, 217, 87)",
    marginTop: 6,
   paddingRight: 5
 },
 avatar: {
   width:50,
   height: 50,
 }
})
