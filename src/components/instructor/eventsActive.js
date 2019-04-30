import React, { Component } from 'react';  
import { View, Text, Button } from 'react-native';
import firebase from 'firebase/app';
import { withNavigation } from 'react-navigation';

import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

class ActiveEvents extends Component {  
  state = { activeEvents: [] };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
    if(user === null) {
      return;
    }  
    
    const today = new Date();

    db.collection('scavengerHunts').where("email", "==", user.email)
    .onSnapshot(snapshot => {
      let activeEvents = [];

      snapshot.forEach(doc => {
        let data = doc.data();
          const closed = data.closed;
          const endDate = data.dateEnd.seconds;
          // convert millisec to sec
          const today = (Date.now() / 1000).toFixed(0);

          if(today < endDate && !closed) {
            activeEvents.push(data);
          }
      });

      this.setState({
        activeEvents
      });
    });})
  }

  render() {
    const { activeEvents } = this.state;

    return (
      <View>
        <Text>Active Events</Text>
        {activeEvents.map(scavengerHunt => (
            <View key={scavengerHunt.accessCode}>
              <Button
                title={scavengerHunt.name}
                onPress={() => {
                  this.props.navigation.navigate('IEventItem', {
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

export default withNavigation(ActiveEvents)