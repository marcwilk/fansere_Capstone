import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Container, Content, Icon, Header, Left, Body, Right, Button } from 'native-base'
import firebase from 'firebase'
import 'firebase/firestore'

export default class Profiledisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  segmentClicked = (index) => {
    this.setState({
      activeIndex: index
    })
  }

  renderSection = () => {
    if (this.state.activeIndex == 0) {
      return (
        <View>
          <Text>This is the teams section</Text>
        </View>
      )
    }
    if (this.state.activeIndex == 1) {
      return (
        <View>
          <Text>This is the roster section</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: 'white' }}>
        <Header style={{ backgroundColor: 'black' }}>
          <Left><Text style={{ paddingLeft: 10, color: 'white' }}>Logout</Text></Left>
          <Body><Text style={{ justifyContent: 'center', color: 'white' }}>Fansere</Text></Body>
          <Right><Text style={{ paddingLeft: 10, color: 'white' }}>Chat</Text></Right>
        </Header>
        <Content>
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Image source={require('../../images/logo.png')} style={{ width: 75, height: 75, borderRadius: 37.5 }} />
              </View>
              <View style={{ flex: 3 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text>20</Text>
                    <Text style={{ fontSize: 10, color: 'grey' }}>Roster</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text>205</Text>
                    <Text style={{ fontSize: 10, color: 'grey' }}>Posts</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text>167</Text>
                    <Text style={{ fontSize: 10, color: 'grey' }}>Check-Ins</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Button bordered dark style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30 }}><Text>Edit Profile</Text></Button>
                    <Button bordered dark style={{ flex: 1, height: 30, marginRight: 10, marginLeft: 5, justifyContent: 'center'}}><Text style={{ color: 'black' }}>Settings</Text></Button>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Fansere</Text>
                <Text>Denver, CO</Text>
                <Text>LeBron Sux | Biggest Browns Fan</Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: 'black'}}>
                <Button transparent onPress={ () => this.segmentClicked(0) } active={ this.state.activeIndex == 0 }>
                  <Text style={[ this.state.activeIndex == 0 ? { color: 'blue' } : { color: 'black' }]}>Teams</Text>
                </Button>
                <Button transparent onPress={ () => this.segmentClicked(1) } active={ this.state.activeIndex == 1 }>
                  <Text style={[ this.state.activeIndex == 1 ? { color: 'blue' } : { color: 'black' }]}>Roster</Text>
                </Button>
              </View>
            </View>
            {this.renderSection()}
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
    padding: 20,
    backgroundColor: 'black'
  }
})
