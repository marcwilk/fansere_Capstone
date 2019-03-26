import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ListView, Image } from 'react-native'
import firebase from 'firebase'
import 'firebase/firestore'
import Modal from 'react-native-modal'
import { Card, Avatar } from 'react-native-elements'
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
                                    chevron chevronColor="white"
                                    />)
}

renderTeams=()=>{
  let mlb ={}
  let nhl ={}
  let nfl ={}
  let nba ={}
  let arr= []
for (key in this.state.userForModal){
  mlb.Team = this.state.userForModal.mlbTeamName,
  mlb.Logo = this.state.userForModal.mlbTeamLogo,
  nhl.Team = this.state.userForModal.nhlTeamName,
  nhl.Logo = this.state.userForModal.nhlTeamLogo,
  nfl.Team = this.state.userForModal.nflTeamName,
  nfl.Logo = this.state.userForModal.nflTeamLogo,
  nba.Team = this.state.userForModal.nbaTeamName,
  nba.Logo = this.state.userForModal.nbaTeamLogo
}
if (Object.values(nhl).includes(undefined)){
  nhl.Team='Pick Your Favorite Hockey Team',
  nhl.Logo='../../images/logo.png'
} else{
  arr.push(nhl)
}
if (Object.values(nba).includes(undefined)){
  nba.Team='Pick Your Favotite Basketball Team',
  nba.Logo='../../images/logo.png'
} else {
  arr.push(nba)
}
if (Object.values(nfl).includes(undefined)){
  nfl.Team='Pick Your Favotite Football Team',
  nfl.Logo='../../images/logo.png'
} else {
  arr.push(nfl)
}
if (Object.values(mlb).includes(undefined)){
  mlb.Team='Pick Your Favotite Baseball Team',
  mlb.Logo='../../images/logo.png'
} else{
  arr.push(mlb)
}
return arr.map((info, i)=><View>
  <ListItem
    key={i}
    title={info.Team}
    leftAvatar ={<Avatar rounded large source={{uri: info.Logo}} height={80} width={80} aspectRatio={1.5}/>}
    style={styles.list}
    containerStyle={{backgroundColor: 'black'}}
    titleStyle={{ color: 'white', fontWeight: 'bold' }}
  />
</View>)
}

  render() {
    console.log(this.state.userForModal)
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={require('../../images/logo.png')}/>
                <Text style={styles.name}>My Roster</Text>
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
                style={{width: 200, height: 200, borderRadius: 100, borderWidth: 2, textAlign: 'center', borderColor: '#7ed957'}}
                source={{uri: `${this.state.userForModal.picture}`}}
              />
              </View>
              <Text style={{color: 'white', fontSize: 16, padding: 5, fontWeight: 'bold', textAlign: 'center'}}>
                Tagline: {this.state.userForModal.tagline}
              </Text>
              <Text style={{color: 'white', fontSize: 16, padding: 5, fontWeight: 'bold', textAlign: 'center'}}>
                Location: {this.state.userForModal.location}
              </Text>
                 {this.renderTeams()}
                 <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                 <Button style={{ flex: 3, margin: 10, justifyContent: 'center', height: 30, backgroundColor: '#7ed957' }}
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
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1
  },
  header: {
    backgroundColor: 'black',
    width: '100%'
  },
  headerContent: {
    padding: 10,
    alignItems: 'center'
  },
  modalText: {
    color: 'black'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#7ed957',
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
    padding: 30,
    backgroundColor :'black'
  },
  box: {
    padding:5,
    marginTop:0,
    marginBottom:1,
    borderWidth: 1,
    borderColor: '#7ed957',
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
