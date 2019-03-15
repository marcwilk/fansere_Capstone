import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Content, Icon, Left, Body, Right, Button } from 'native-base'
import { Header } from 'react-native-elements'
import Modal from 'react-native-modal'
import Teams from './teams'
import Roster from './roster'
import firebase from 'firebase'
import 'firebase/firestore'

export default class Profiledisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      isModalVisable: false
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
        <Teams />
      )
    }
    if (this.state.activeIndex == 1) {
      return (
        <Roster />
      )
    }
  }

  _toggleModal = () =>
     this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: 'black' }}>
        <Header backgroundColor='#7ed957' placement='center' centerComponent={{ text: 'Profile', style: { color: 'white', fontSize: 20, fontWeight: 'bold' }}}/>
        <Content>
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Image source={require('../../images/logo.png')} style={{ width: 75, height: 75, borderRadius: 37.5 }} />
              </View>
              <View style={{ flex: 3 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>20</Text>
                    <Text style={{ fontSize: 10, color: 'white' }}>Roster</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>205</Text>
                    <Text style={{ fontSize: 10, color: 'white' }}>Posts</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>167</Text>
                    <Text style={{ fontSize: 10, color: 'white' }}>Check-Ins</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Button light style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30 }} onPress = { this._toggleModal }>
                      <Text style={{ color: 'black' }}>Edit Profile</Text>
                    </Button>
                    <Modal isVisible={this.state.isModalVisible}>
                      <View style={ styles.modalViewContainer }>
                        <Text style={ styles.modalText }>Edit Profile Details</Text>
                        <View style={ styles.modalSeparatorLine }>
                        </View>
                        <Text style={ styles.modalText }>Username:</Text>
                        <Text style={ styles.modalText }>Location:</Text>
                        <Text style={ styles.modalText }>Tagline:</Text>
                        <Button success style={{ height: 30, padding: 10, marginLeft: 100 }} onPress={this._toggleModal}>
                          <Text style={ styles.modalText }>Save Changes</Text>
                        </Button>
                        <Button danger style={{ height: 30, padding: 10, marginLeft: 100 }} onPress={this._toggleModal}>
                          <Text style={ styles.modalText }>Cancel Changes</Text>
                        </Button>
                      </View>
                    </Modal>
                    <Button danger style={{ flex: 1, height: 30, marginRight: 10, marginLeft: 5, justifyContent: 'center'}}>
                      <Text style={{ color: 'black' }}>Logout</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Fansere</Text>
                <Text style={{ color: 'white' }}>Denver, CO</Text>
                <Text style={{ color: 'white' }}>LeBron Sux | Biggest Browns Fan</Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: 'black', backgroundColor: '#7ed957'}}>
                <Button transparent onPress={ () => this.segmentClicked(0) } active={ this.state.activeIndex == 0 }>
                  <Text style={[ this.state.activeIndex == 0 ? { color: 'white' } : { color: 'black' }]}>Teams</Text>
                </Button>
                <Button transparent onPress={ () => this.segmentClicked(1) } active={ this.state.activeIndex == 1 }>
                  <Text style={[ this.state.activeIndex == 1 ? { color: 'white' } : { color: 'black' }]}>Roster</Text>
                </Button>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderTopWidth: 1, backgroundColor: 'white', color: 'black'}}>
              {this.renderSection()}
            </View>
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
  },
  modalViewContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  modalText: {
    justifyContent: 'center',
    color: 'black'
  },
  modalSeparatorLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 10,
    borderTopWidth: 1,
    borderTopColor: 'black',
  }
})
