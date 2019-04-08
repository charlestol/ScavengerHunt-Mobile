import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import SearchEvent from '../components/SearchEvent';
import UserEventHistory from '../components/UserEventHistory';
import firebase from 'firebase';
require('../config')

export default class StudentDash extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
  }

  handleSignout = () => {
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
  }

render() {
    const { currentUser } = this.state
return (
      <View style={styles.container}>
        <Text>Student Dashboard</Text>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <SearchEvent />
        <UserEventHistory/>
        <Button title="sign out" onPress={this.handleSignout}></Button>
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