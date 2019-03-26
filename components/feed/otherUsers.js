import React from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'
import firebase from 'firebase'
import { Header, ListItem, Card} from 'react-native-elements'



export default class OtherUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {


    }
  }

  onPressListItem(id, data) {

    this.props.modalUser(id, data.username, data.location, data.tagline, data.picture,  data)
    this.props.toggle()
  }

  renderUserList(userArr) {
    return userArr.map((info, i) =>
        <View>
          <ListItem
            key={i}
            title={info.data.username}
            style={styles.list}
            onPress={e => this.onPressListItem(info.userId, info.data)}
            containerStyle={{backgroundColor: 'black'}}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
            chevron chevronColor="black"
          />
        </View>)
  }


  render() {
    return (
      <View>
        {this.renderUserList(this.props.otherUsers)}
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
