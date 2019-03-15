import React from 'react'
import {StyleSheet, ScrollView } from 'react-native';
import Message from './message'



export default class Messanges extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <ScrollView style={styles.navHeight}>
        {this.props.messages.map((messageData, i) => <Message info={messageData} key={i} userId={this.props.userId} />)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  navHeight: { marginBottom: 120}
})
