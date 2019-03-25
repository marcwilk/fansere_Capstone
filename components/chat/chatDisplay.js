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
      userId: 'ldPba8sgFXeM2q3SF2u6CupAy7v2',
      conversations: [],
      chats: [],
      showChat: false,
      chatId: null,
      chatName: null,
    }
    this.showChat = this.showChat.bind(this)
    this.hideChat = this.hideChat.bind(this)
    this.onPressChat = this.onPressChat.bind(this)
    this.setChatName = this.setChatName.bind(this)
    this.setChatId = this.setChatId.bind(this)
    this.addMessage = this.addMessage.bind(this)
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
    //console.log(this.props.screenProps)
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
          }
        })
      })
  }

  onPressChat(chatId) {
      firebase.firestore().collection('chat')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot(snapshot => {
          let result = []
          snapshot.forEach(doc => {
            result.push(doc.data())
          })
          this.setState({chats: result})
          //console.log(this.state.chats)
        })
  }

  addMessage(message) {
    firebase.firestore().collection('chat')
      .doc(this.state.chatId)
      .collection('messages').add({
        userId: this.state.userId,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  setChatName(input) {
    this.setState({chatName: input})
  }

  setChatId(input) {
    this.setState({chatId: input})
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
        {this.state.showChat ? <Chat addMessage={this.addMessage} hideChat={this.hideChat} messages={this.state.chats} userId={this.state.userId} chatName={this.state.chatName}/> : <Chatlist setChatId={this.setChatId} setChatName={this.setChatName} conversations={this.state.conversations} pressChat={this.onPressChat} showChat={this.showChat}/>}
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
