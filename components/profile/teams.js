import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ListView, Image } from 'react-native'
import { ListItem, Avatar} from 'react-native-elements'
import firebase from 'firebase'
import 'firebase/firestore'

export default class Teams extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userId: 'WbnNM1HOlxSITQTPnkjY2R7dYOJ3',
      userData: []
    }
  }

componentDidMount(){
  firebase.firestore().collection('users')
  .doc(this.state.userId)
   .onSnapshot(snapshot=>{
         this.setState({userData: snapshot.data()})
     })
 }

renderUserTeams=()=>{
  let mlb ={}
  let nhl ={}
  let nfl ={}
  let nba ={}
  let arr= []
for (key in this.state.userData){
  mlb.Team = this.state.userData.mlbTeamName,
  mlb.Logo = this.state.userData.mlbTeamLogo,
  nhl.Team = this.state.userData.nhlTeamName,
  nhl.Logo = this.state.userData.nhlTeamLogo,
  nfl.Team = this.state.userData.nflTeamName,
  nfl.Logo = this.state.userData.nflTeamLogo,
  nba.Team = this.state.userData.nbaTeamName,
  nba.Logo = this.state.userData.nbaTeamLogo
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
    leftAvatar ={<Avatar rounded large source={{uri: info.Logo}} height={80} width={80}  aspectRatio={1.5}/>}
    style={styles.list}
    containerStyle={{backgroundColor: 'black'}}
    titleStyle={{ color: 'white', fontWeight: 'bold' }}
  />
</View>)
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
              {this.renderUserTeams()}
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
    backgroundColor :'black'
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
  },
  list: {
    borderWidth: .5,
    borderColor: "rgb(126, 217, 87)",
    marginTop: 6,
   paddingRight: 5
 },
})
