import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ListView, Image } from 'react-native'
import firebase from 'firebase'
import 'firebase/firestore'
import Modal from 'react-native-modal'
import { Card } from 'react-native-elements'
import { Container, Content, Icon, Left, Body, Right, Button } from 'native-base'
import { ListItem } from 'react-native-elements'

export default class Roster extends React.Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      rosterIds: [],
      userObjs: [],
      userForModal: {},
      isModalVisible: false,
    }
    this.closeModal = this.closeModal.bind(this)
  }



  componentDidMount() {
    //call to grab all conversation relationships
    firebase.firestore().collection('conversations')
      .onSnapshot(snapshot => {
        let newDocs = snapshot.docChanges()
        newDocs.forEach(doc => {
          if (doc.type == 'added') {
            let releventInfo = this.checkForUserId(doc.doc.data().members)
            if (releventInfo) {
              let otherUser = doc.doc.data().members.filter(conv => conv.userId !== this.props.userId)
              this.setState({rosterIds: [...this.state.rosterIds, otherUser[0]]})
              }
          }
          })
      })
  }

  pullUserInfo(userId) {
    firebase.firestore().collection('users')
      .doc(userId)
      .onSnapshot(snapshot => {
        this.setState({userForModal: snapshot.data(), isModalVisible: true})
      })
  }

  closeModal() {
    this.setState({ isModalVisible: false })
  }


  checkForUserId(arr) {
    let result = null
    for (let x = 0; x < arr.length; x++) {
        if (arr[x].userId === this.props.userId) {
            result = arr
        }
    }
    return result
}

// <ListView style={styles.container} enableEmptySections={true}
//   dataSource={this.ds.cloneWithRows(this.state.rosterIds)}
//   renderRow={(user) => {
//     return (
//       <TouchableOpacity
//         onPress={() => this.pullUserInfo(user.userId)}>
//         <View style={styles.box}>
//            <Text style={styles.username}>{user.username}</Text>
//         </View>
//       </TouchableOpacity>
//     )
// }}/>

renderRosterList(chatArr) {
  return chatArr.map((info, i) => <ListItem
                                    key={i}
                                    title={info.username}
                                    style={styles.list}
                                    containerStyle={{backgroundColor: 'black'}}
                                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                    onPress={e => this.pullUserInfo(info.userId)}
                                    chevron chevronColor="black"
                                    />)
}

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={require('../../images/logo.png')}/>
                <Text style={styles.name}>My Friends</Text>
            </View>
          </View>
          <View style={styles.body}>
          {this.renderRosterList(this.state.rosterIds)}
            </View>
            <View >
            <Modal isVisible={this.state.isModalVisible} style={{paddingRight: 30}}>
            <View>
              <Card containerStyle={{width: "100%", height: "90%",  backgroundColor: 'black'}}>
              <Text style={{color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>{this.state.userForModal.username}</Text>
              <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 200, height: 200, textAlign: 'center'}}
                source={{uri: `${this.state.userForModal.picture}`}}
              />
              </View>
              <Text style={{color: 'white', fontSize: 16}}>
                Tagline: {this.state.userForModal.tagline}
              </Text>
              <Text style={{color: 'white', fontSize: 16}}>
                Location: {this.state.userForModal.location}
              </Text>
              <Text style={{color: 'white', fontSize: 16}}>
                Teams:
              </Text>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Button danger style={{ flex: 3, margin: 10, justifyContent: 'center', height: 30 }}
                  onPress= {this.closeModal}>
                  <Text style= {styles.modalText }>Close</Text>
                </Button>
                </View>
              </Card>
              </View>
            </Modal>
            </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'black'
  },
  header: {
    backgroundColor: '#545454',
    width: '100%'
  },
  headerContent: {
    padding: 10,
    alignItems: 'center'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10
  },
  image: {
    width: 60,
    height: 60
  },
  name: {
    fontSize:20,
    color:'#fff',
    fontWeight:'600'
  },
  body: {
    width: '100%',
    padding:30,
    backgroundColor :'#a6a6a6'
  },
  box: {
    padding:5,
    marginTop:0,
    marginBottom:1,
    borderWidth: 1,
    borderColor: '#7ed957',
    //backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username: {
    color: 'white',
    fontSize:20,
    alignSelf:'center',
    marginLeft:10
  },
  list: {
    borderWidth: 1,
    borderColor: "rgb(126, 217, 87)",
  }
})
