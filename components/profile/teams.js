import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ListView, Image } from 'react-native'

export default class Teams extends React.Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      teamList: [
         {image: 'http://content.sportslogos.net/logos/6/229/full/8926_denver_nuggets-primary-2019.png', teamname:'Denver Nuggets'},
         {image: 'http://content.sportslogos.net/logos/18/275/full/5990.gif', teamname:'The Denver Nuggets'},
         {image: 'http://content.sportslogos.net/logos/6/229/full/qdcpbu7weno1htqgg5kk10i8o.gif', teamname:'Nuggets of Denver'},
         {image: 'http://content.sportslogos.net/logos/18/275/full/5213.gif', teamname:'Your Denver Nuggets'},
         {image: 'http://content.sportslogos.net/logos/6/229/full/4681_denver_nuggets-alternate-2019.png', teamname:'Nuggets'},
         {image: 'http://content.sportslogos.net/logos/6/229/full/tht30q65rj1sca9rhsq5zfoih.gif', teamname:'You Know It'},
      ]
    }
  }

    render() {
    return (
      <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Image style={styles.avatar} source={require('../../images/logo.png')}/>
                <Text style={styles.name}>My Teams</Text>
              </View>
            </View>
            <View style={styles.body}>
              <ListView style={styles.container} enableEmptySections={true}
                dataSource={this.ds.cloneWithRows(this.state.teamList)}
                renderRow={(user) => {
                  return (
                      <View style={styles.box}>
                      <Image style={styles.image} source={{uri: user.image}}/>
                        <Text style={styles.teamname} >{user.teamname}</Text>
                      </View>
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
    padding: 10,
    backgroundColor: 'black'
  },
  header: {
    backgroundColor: '#545454',
    width: '100%',
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
    padding: 30,
    backgroundColor :'#a6a6a6'
  },
  box: {
    padding:5,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: '#a6a6a6',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  teamname: {
    color: 'black',
    fontSize:20,
    alignSelf:'center',
    marginLeft:10
  }
})
