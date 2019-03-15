import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import { Header, ListItem } from 'react-native-elements'
import firebase from 'firebase'
import 'firebase/firestore'

export default class Chatlist extends Component {
  constructor(props) {
    super(props)
  }

  onPressChat(chatId, chatName) {
    this.props.pressChat(chatId)
    this.props.showChat()
    this.props.setChatName(chatName)
  }



  renderChatList(chatArr) {
    return chatArr.map((info, i) => <ListItem
                                      key={i}
                                      id={info.convoId}
                                      title={info.otherUser.username}
                                      style={styles.list}
                                      containerStyle={{backgroundColor: 'black'}}
                                      titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                      onPress={e => this.onPressChat(info.convoId, info.otherUser.username)}
                                      chevron chevronColor="black"
                                      />)
  }


render() {
  return (
    <View>
      <Header
          backgroundColor="rgb(126, 217, 75)"
          centerComponent={{ text: 'Chat', style: { color: '#fff', fontSize: 22} }}
        />
        {this.renderChatList(this.props.conversations)}
    </View>
  )
}

}

const styles = StyleSheet.create({
  list: {
    borderWidth: .5,
    borderColor: "rgb(126, 217, 87)",
  }
})
