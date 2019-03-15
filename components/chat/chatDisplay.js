import React from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'
import firebase from 'firebase'
import 'firebase/firestore'
import Chatlist from './chatList'
import Chat from './chat'

export default class Chatdisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: "soalBDZkkoMBzJAd5EdQsE5x8113",
      conversations: [],
      chats: [],
      showChat: false,
      chatName: null,
    }
    this.showChat = this.showChat.bind(this)
    this.hideChat = this.hideChat.bind(this)
    this.onPressChat = this.onPressChat.bind(this)
    this.setChatName = this.setChatName.bind(this)
  }

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
    //call to grab all conversation relationships
    firebase.firestore().collection('conversations')
      .onSnapshot(snapshot => {
        let newDocs = snapshot.docChanges()
        newDocs.forEach(doc => {
          let releventInfo = this.checkForUserId(doc.doc.data().members)
          if (releventInfo) {
            let otherUser = doc.doc.data().members.filter(conv => conv.userId !== this.state.userId)
            let conversation = {
              convoId: doc.doc.id,
              otherUser: otherUser[0]
            }
            this.setState({conversations: [...this.state.conversations, conversation]})
            //console.log(this.state.conversations)
          }
        })
      })
  }

  onPressChat(chatId) {
    //call to grab relebent chat messages
    firebase.firestore().collection('chats')
      .doc(chatId)
      .onSnapshot(snapshot => {
        if (snapshot.data()) {
          let messages = snapshot.data().messages
            this.setState({chats: messages})
            //console.log(this.state.chats)
        }
      })
  }

  setChatName(input) {
    this.setState({chatName: input})
  }

  showChat() {
    this.setState({showChat: true})
  }

  hideChat() {
    this.setState({showChat: false, chats: []})
  }

  render() {
    return (
      <View>
        {this.state.showChat ? <Chat hideChat={this.hideChat} messages={this.state.chats} userId={this.state.userId} chatName={this.state.chatName}/> : <Chatlist setChatName={this.setChatName} conversations={this.state.conversations} pressChat={this.onPressChat} showChat={this.showChat}/>}
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
