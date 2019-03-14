import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import { Header, ListItem } from 'react-native-elements'

export default class Chatlist extends Component {
  constructor(props) {
    super(props)
  }

  renderChatList(chatArr) {
    return chatArr.map((info, i) => <ListItem key={i} title={info.otherUser.username} style={styles.list} />)
  }


render() {
  return (
    <View>
      <Header
          backgroundColor="#228b22"
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
    borderColor: "#228b22",
  }
})
