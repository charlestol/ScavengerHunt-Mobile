import React, { Component } from 'react';  
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';
import JoinEvent from './eventJoin';
import firebase from 'firebase/app'
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

const ERROR_DOES_NOT_EXIST = "Invalid access code entered. Either the event has ended, it was mis-typed or it does not exist. Contact your instructor for verification."

export default class SearchEvent extends Component { 
  state = {accessCode: '', scavengerHunt: null, closed: false, error: null} 
  
  onSearch = () => {
    Alert.alert('Searching Event');
    const { accessCode } = this.state

    db.collection('scavengerHunts').doc(accessCode).get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const sh = doc.data();
          const closed = sh.closed;

          if(!closed) {
            this.setState({
              scavengerHunt: sh,
              closed: false,
              error: null
            })
          } 
          else {
            this.setState({
            scavengerHunt: null,
            closed: true,
            error: null
            })
          }
        } 
        else {
          // doc.data() will be undefined in this case
          console.log("No such document!", ERROR_DOES_NOT_EXIST);
          this.setState({
            error: ERROR_DOES_NOT_EXIST,
            scavengerHunt: null,
            closed: false
          })
        }
      }).catch(error => {
          this.setState({
            error: error,
            scavengerHunt: null
          })
          console.log("Error getting document:", error);
      });


  }

  render() {
    const {accessCode, closed, scavengerHunt, error} = this.state;
    
    return (
      <View>
        <Text>Search Event</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Access Code"
          onChangeText={accessCode => this.setState({ accessCode })}
          value={this.state.accessCode}
        />
        <Button title="Search" onPress={this.onSearch} />
        {scavengerHunt && !closed &&
          <View>
            <Text>{scavengerHunt.name}</Text>
            <JoinEvent scavengerHunt={scavengerHunt} />
          </View>
        }
        {error && <Text>{error}</Text>}
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})