import React from 'react'
import { View, StyleSheet, Text, TextInput, Image} from 'react-native'
import firebase from 'firebase'
import 'firebase/firestore'
import { Container, Content, Icon, Left, Body, Right, Button} from 'native-base'
import { ListItem, Avatar} from 'react-native-elements'
import OtherUsers from './otherUsers'
import Modal from 'react-native-modal'
import { Header, Card } from 'react-native-elements'

export default class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: `${this.props.userId}`,
      userName:'',
      nearbyUsers: [],
      isModalVisible: false,
      modalUser: {},
      conversations: []
    }
    this.modalUser = this.modalUser.bind(this)
  }

  _toggleModal = () =>
     this.setState({ isModalVisible: !this.state.isModalVisible })

     checkForUserId(arr) {
       let result = null
       for (let x = 0; x < arr.length; x++) {
           if (arr[x].userId === this.state.userId) {
               result = arr
           }
       }
       //console.log(result)
       return result
   }


  componentDidMount() {
      firebase.firestore().collection('conversations')
        .onSnapshot(snapshot => {
          let newDocs = snapshot.docChanges()
          let conversations = []
          newDocs.forEach(doc => {
            let releventInfo = this.checkForUserId(doc.doc.data().members)
            //console.log(releventInfo)
            if (releventInfo) {
              let otherUser = doc.doc.data().members.filter(conv => conv.userId !== this.state.userId)
              conversations.push(otherUser[0].userId)
              //this.setState({conversations: [...this.state.conversations, otherUser[0].userId]})
            }
            this.setState({conversations: conversations})
            //console.log(this.state.conversations)
          })
        })
        firebase.firestore().collection('users')
          .where('location', '==', 'Denver')
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {

              let userObj = {
                userId: doc.id,
                data: doc.data()
              }
              if (!this.state.conversations.includes(doc.id) && doc.id !== this.state.userId) {
                this.setState({nearbyUsers: [...this.state.nearbyUsers, userObj]})
              }
            }
            )
          })
          // make a call to get username
          firebase.firestore().collection('users')
            .doc(`${this.state.userId}`)
            .get()
            .then(snapshot =>
              this.setState({userName: snapshot.data().username})
            )

  }

  removeUserFromState(arr, userId) {
    return arr.filter(item => item.userId !== userId)
  }

  modalUser(userId, username, location, tagline, picture, data) {

    let user = {
      userId: userId,
      username: username,
      location: location,
      tagline: tagline,
      picture: picture,
      data: data

    }
    //why does setState not work here?
    this.state.modalUser = user
  }



  addToRoster(id, username) {
    firebase.firestore().collection('conversations').add({
      members: [
        {
         userId: this.state.userId,
         username: this.state.userName,
       },
       {
         userId: id,
         username: username,
       }
      ]
      })
      let newUserArr = this.removeUserFromState(this.state.nearbyUsers, id)
      this.setState({nearbyUsers: newUserArr})
      this._toggleModal()
  }

  renderTeams=()=>{
    let mlb ={}
    let nhl ={}
    let nfl ={}
    let nba ={}
    let arr= []

 for (key in this.state.modalUser.data){
    mlb.Team = this.state.modalUser.data.mlbTeamName,
    mlb.Logo = this.state.modalUser.data.mlbTeamLogo,
    nhl.Team = this.state.modalUser.data.nhlTeamName,
    nhl.Logo = this.state.modalUser.data.nhlTeamLogo,
    nfl.Team = this.state.modalUser.data.nflTeamName,
    nfl.Logo = this.state.modalUser.data.nflTeamLogo,
    nba.Team = this.state.modalUser.data.nbaTeamName,
    nba.Logo = this.state.modalUser.data.nbaTeamLogo
  }
  if (Object.values(nhl).includes(undefined)){
    nhl.Team='Pick Your Favorite Hockey Team',
    nhl.Logo='../../images/logo.png'
  } else{
    arr.push(nhl)
  }
  if (Object.values(nba).includes(undefined)){
    nba.Team='Pick Your Favotite Basketball Team',
    nba.Logo='../../images/logo.png'
  } else {
    arr.push(nba)
  }
  if (Object.values(nfl).includes(undefined)){
    nfl.Team='Pick Your Favotite Football Team',
    nfl.Logo='../../images/logo.png'
  } else {
    arr.push(nfl)
  }
  if (Object.values(mlb).includes(undefined)){
    mlb.Team='Pick Your Favotite Baseball Team',
    mlb.Logo='../../images/logo.png'
  } else{
    arr.push(mlb)
  }
  return arr.map((info, i)=><View>
    <ListItem
      key={i}
      title={info.Team}
      leftAvatar ={<Avatar rounded large source={{uri: info.Logo}} height={80} width={80}  aspectRatio={1.5}/>}
      style={styles.list}
      containerStyle={{backgroundColor: 'black'}}
      titleStyle={{ color: 'white', fontWeight: 'bold' }}
    />
  </View>)
  }




  render() {

    return (
      <View>
      <Header
          backgroundColor="rgb(126, 217, 75)"
          centerComponent={{ text: 'Nearby Users', style: { color: '#fff', fontSize: 22} }}
        />
        <OtherUsers modalUser={this.modalUser} otherUsers={this.state.nearbyUsers} toggle={this._toggleModal}/>
        <View >
        <Modal isVisible={this.state.isModalVisible} style={{paddingRight: 30}}>
        <View>

          <Card containerStyle={{width: "100%", height: "90%",  backgroundColor: 'black'}}>

            <Text style={{color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>{this.state.modalUser.username}</Text>
            <View style={{alignItems: 'center'}}>
            <Image source={{uri: `${this.state.modalUser.picture}`}}  style={{width: 200, height: 200, borderRadius: 100, borderWidth: 2, textAlign: 'center', borderColor: '#7ed957'}} />
          </View>
            <Text style={{color: 'white', fontSize: 16, padding: 5, fontWeight: 'bold', textAlign: 'center'}}>
              Tagline: {this.state.modalUser.tagline}
            </Text>
            <Text style={{color: 'white', fontSize: 16, padding: 5, fontWeight: 'bold', textAlign: 'center'}}>
              Location: {this.state.modalUser.location}
            </Text>
             {this.renderTeams()}
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Button style={{ flex: 3, margin: 10, justifyContent: 'center', backgroundColor: 'white', height: 30 }}
              onPress= { () => this.addToRoster(this.state.modalUser.userId, this.state.modalUser.username) }>
              <Text style = {styles.submitButtonText}>Add to Roster</Text>
            </Button>
            <Button style={{ flex: 3, margin: 10, justifyContent: 'center', backgroundColor: '#7ed957', height: 30 }}
              onPress= {this._toggleModal}>
              <Text style= {styles.modalText }>Close</Text>
            </Button>

            </View>

          </Card>
          </View>
        </Modal>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    borderWidth: .5,
    borderColor: "rgb(126, 217, 87)",
    marginTop: 6,
   paddingRight: 5
  },

});
