import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <TextInput
        style={styles.container}
        placeholder={' Type a message...'}
        clearTextOnFocus={true}
        keyboardType={'default'}
        onSubmitEditing={e => this.props.addMessage(e.nativeEvent.text)}
        >
        </TextInput>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderColor: "rgb(126, 217, 87)",
    borderWidth: 3,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'white',
    color: 'black',
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 10
  }
})
