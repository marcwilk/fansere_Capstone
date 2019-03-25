import React from 'react'
import {StyleSheet, Text, View} from 'react-native';

export default class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  styleSelector(input) {
    return input !== this.props.userId ? styles.a : styles.b
  }

  render() {
    return (
      <View>
        <Text style={this.styleSelector(this.props.info.userId)}>{this.props.info.message}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  a: {
    color: 'white',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
    marginLeft: 20,
    marginRight: 80,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "grey",
    padding: 10,
    overflow: 'hidden',
  },
  b: {
    color: 'white',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
    textAlign: 'right',
    marginLeft: 80,
    marginRight: 20,
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: 'black',
    borderColor: "rgb(126, 217, 87)",
    padding: 10,
    overflow: 'hidden'
  }
})
