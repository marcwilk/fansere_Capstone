import React from 'react'
import { View, StyleSheet, Text, TextInput} from 'react-native'
import firebase from 'firebase'
import 'firebase/firestore'
import { Container, Content, Icon, Left, Body, Right, Button, Image } from 'native-base'
import OtherUsers from './otherUsers'
import Modal from 'react-native-modal'
import { Header, Card } from 'react-native-elements'

export default class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 'soalBDZkkoMBzJAd5EdQsE5x8113',
      userName:'Sean Tansey',
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
       return result
   }


  componentDidMount() {
    firebase.firestore().collection('users')
      .where('location', '==', 'Denver')
      .onSnapshot(snapshot => {
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
      firebase.firestore().collection('conversations')
        .onSnapshot(snapshot => {
          let newDocs = snapshot.docChanges()
          newDocs.forEach(doc => {
            let releventInfo = this.checkForUserId(doc.doc.data().members)
            if (releventInfo) {
              let otherUser = doc.doc.data().members.filter(conv => conv.userId !== this.state.userId)
              this.setState({conversations: [...this.state.conversations, otherUser[0].userId]})
            }
          })
        })
  }

  removeUserFromState(arr, userId) {
    return arr.filter(item => item.userId !== userId)
  }

  modalUser(userId, username, location, tagline) {
    let user = {
      userId: userId,
      username: username,
      location: location,
      tagline: tagline

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

            <Text style={{color: 'white', fontSize: 16}}>
              Tagline: {this.state.modalUser.tagline}
            </Text>
            <Text style={{color: 'white', fontSize: 16}}>
              Location: {this.state.modalUser.location}
            </Text>
            <Text style={{color: 'white', fontSize: 16}}>
              Teams:
            </Text>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Button success style={{ flex: 3, margin: 10, justifyContent: 'center', height: 30 }}
              onPress= { () => this.addToRoster(this.state.modalUser.userId, this.state.modalUser.username) }>
              <Text style = {styles.submitButtonText}>Add to Roster</Text>
            </Button>
            <Button danger style={{ flex: 3, margin: 10, justifyContent: 'center', height: 30 }}
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

});
