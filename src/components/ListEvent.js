import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore'
require('../config')
const db = firebase.firestore();

export default class ListEvent extends Component {  
    state = { scavengerHunts: [] };

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        
        
      undefined = db.collection('test').where("email", "==", user.email)
      .onSnapshot(snapshot => {
        let scavengerHunts = [];

        snapshot.forEach(doc => {
          scavengerHunts.push({ ...doc.data() })
        });

        this.setState({
          scavengerHunts
        });
      });})
    }

    componentWillUnmount() {
      this.unsubscribe();
    }
    render() {
        const { scavengerHunts } = this.state;
      return (
        <View>
          <Text>List Event</Text>
          {scavengerHunts.map(scavengerHunt => (
            <View key={scavengerHunt.accessCode}>
              <Text>{scavengerHunt.name}</Text>
            </View>
            ))}
        </View>
      );
    }
  }