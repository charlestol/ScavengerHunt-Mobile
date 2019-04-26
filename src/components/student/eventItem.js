import React, { Component } from 'react';  
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();
// import ListTasks from './taskList';
import EventResults from './eventResults';

export default class EventItem extends Component {
  state = { 
    sh: {},
    closed: false,
    notStarted: false,
  }

  componentDidMount() {
    let ac = this.props.navigation.state.params.accessCode

    db.doc(`scavengerHunts/${ac}`).get()
    .then(doc => {
      const data = doc.data()
      const startDate = data.dateStart.seconds
      const endDate = data.dateEnd.seconds
      // converting from millisec to sec to compare to endDate
      const today = (Date.now() / 1000).toFixed(0)

      let sh = data
      let notStarted = false
      let closed = false
      const eventClosed = data.closed


      if(today > endDate || eventClosed) {
        closed = true
      } else {
        closed = false
      }

      if(startDate > today) {
        notStarted = true
      } else {
        notStarted = false
      }

      this.setState({
        sh,
        closed,
        notStarted,
      });
    })
  }

  render() {
    const { sh, closed, notStarted } = this.state
    return (
      <View style={styles.container}>
        {sh.accessCode && 
          <View>
             <Button
                title={"back"}
                onPress={() => {
                  this.props.navigation.navigate('Student')
                }}
              />
            <Text>{sh.name}</Text>
            {closed && 
              <Text>This event has ended</Text>
            }
            <EventResults navigation={this.props.navigation} />
            {notStarted && <Text>The event has not started</Text>}
            {/* {!notStarted && <ListTasks email={authUser.email} />} */}
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})