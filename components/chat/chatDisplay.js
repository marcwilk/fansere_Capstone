import React from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'
import firebase from 'firebase'
import 'firebase/firestore'
import Chatlist from './chatList'

export default class Chatdisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: "soalBDZkkoMBzJAd5EdQsE5x8113",
      conversations: []
    }
  }

  componentDidMount() {
    firebase.firestore().collection('conversations')
      .onSnapshot(snapshot => {
        let newDocs = snapshot.docChanges()
        newDocs.forEach(doc => {
          let otherUser = doc.doc.data().members.filter(conv => conv.userId !== this.state.userId)
          let conversation = {
            convoId: doc.doc.id,
            otherUser: otherUser[0]
          }
          this.setState({conversations: [...this.state.conversations, conversation]})
          console.log(this.state.conversations)
        })
      })
  }

  render() {
    return (
      <View>
        <Chatlist conversations={this.state.conversations}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
    padding: 20,
  }
})
