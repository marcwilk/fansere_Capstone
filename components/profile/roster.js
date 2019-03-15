import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ListView, Image } from 'react-native'

export default class Roster extends React.Component {

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: [
         {image: 'https://bootdey.com/img/Content/avatar/avatar6.png', username:'Tim Brady'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar2.png', username:'Erin Rodgers'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar3.png', username:'#EliteJoeFlacco'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar4.png', username:'Mark Mahomes'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar1.png', username:'Peter Rivers'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar6.png', username:'Wario Lemieux'},
      ],
      addFriendsList: [
         {image: 'https://cdn.shopify.com/s/files/1/1598/4133/products/CW-HG-PL1007-Dandy-Lion-10ich-Fine-China-Plate.jpg?v=1538002295', username:'Tucker Nemcek'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar2.png', username:'Will Brown'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar6.png', username:'Sean Tansey'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar4.png', username:'Louis C.K.'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar7.png', username:'Ben Strater'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar8.png', username:'Owen Thompson'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar3.png', username:'Mark Fantini'},
         {image: 'https://bootdey.com/img/Content/avatar/avatar1.png', username:'Phil Borgenicht'},
      ]
    }
  }

  onPressNewFriend(input, arr1, arr2) {
    this.props.add(input)
    let filtered = arr2.filter(obj => obj.username !== input)
    let objToMove = arr2.find(obj => obj.username === input)
    this.setState({dataSource: [...this.state.dataSource, objToMove], addFriendsList: filtered})
    this.forceUpdate()

  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                  <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>
                  <Text style={styles.name}>Add Friends</Text>
              </View>
            </View>
            <View style={styles.body}>
              <ListView style={styles.container} enableEmptySections={true}
                dataSource={this.ds.cloneWithRows(this.state.addFriendsList)}
                renderRow={(user) => {
                  return (
                    <TouchableOpacity
                      onPress={e => this.onPressNewFriend(user.username, this.state.dataSource, this.state.addFriendsList)}>
                      <View style={styles.box}>
                      <Image style={styles.image} source={{uri: user.image}}/>
                        <Text style={styles.username} >{user.username}</Text>
                      </View>
                    </TouchableOpacity>
                  )
              }}/>
            </View>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                  <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>
                  <Text style={styles.name}>My Friends</Text>
              </View>
            </View>
            <View style={styles.body}>
              <ListView style={styles.container} enableEmptySections={true}
                dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                renderRow={(user) => {
                  return (
                    <TouchableOpacity>
                      <View style={styles.box}>
                        <Image style={styles.image} source={{uri: user.image}}/>
                         <Text style={styles.username}>{user.username}</Text>
                      </View>
                    </TouchableOpacity>
                  )
              }}/>
            </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  header: {
    backgroundColor: '#545454',
    width: 350
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
    padding:30,
    backgroundColor :'#a6a6a6'
  },
  box: {
    padding:5,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#fff',
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
    color: 'black',
    fontSize:20,
    alignSelf:'center',
    marginLeft:10
  }
})
