import React, { Component } from 'react';  
import { View, Text, Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

export default class UserEventHistory extends Component {  

    state = { scavengerHunts: [] };

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
      if(user === null) {
        return;
      }  
        
      db.collection('users').doc(user.email).collection('history')
      .onSnapshot(snapshot => {
        let scavengerHunts = [];

        snapshot.forEach(doc => {
          scavengerHunts.push({ ...doc.data() })
        });

        this.setState({
          scavengerHunts
        });
      });
      })
    }

  render() {
    const { scavengerHunts } = this.state;
    return (
      <View>
        <Text>User Event History</Text>
        {scavengerHunts.map(scavengerHunt => (
            <View key={scavengerHunt.accessCode}>
              <Button
                title={scavengerHunt.name}
                onPress={() => {
                  this.props.navigation.navigate('SEventItem', {
                    accessCode: scavengerHunt.accessCode,
                  })
                }}
              />
            </View>
            ))}
      </View>
    );
  }
}