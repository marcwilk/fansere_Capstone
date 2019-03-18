import React from 'react'
import {StyleSheet, View } from 'react-native';
import Message from './message'



export default class Messanges extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.navHeight}>
        {this.props.messages.map((messageData, i) => <Message info={messageData} key={i} userId={this.props.userId} />)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navHeight: { marginBottom: 10},
  
})
