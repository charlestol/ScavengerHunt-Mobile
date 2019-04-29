import React, { Component } from 'react';  
import { View, Text, Alert, Button, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase/app';
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

class ActiveEvents extends Component {
  state = {
    activeEvents: []
  }

  componentDidMount() {
    // this.setState({ loading: true });
    // converting from millisec to sec to compare to endDate
    const today = new Date();

    // console.log(today)
    firebase.auth().onAuthStateChanged(user => {
      if(user === null) {
          return
      }  
      this.unsubscribe = db.doc(`users/${user.email}`).collection("history").where("dateEnd", ">", today)
        .onSnapshot(snapshot => {
          let activeEvents = []

          snapshot.forEach(doc => {
            let data = doc.data()
            const closed = data.closed
            // console.log(data.dateEnd)
            if(!closed) {
              activeEvents.push(data)
            }
          })

          this.setState({
            activeEvents,
          })
        })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { activeEvents } = this.state;
    return (
      <View>
        <Text>On-Going Hunt Events</Text>
        {activeEvents.map(scavengerHunt => (
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

export default withNavigation(ActiveEvents)