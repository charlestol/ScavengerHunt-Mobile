import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebase from 'firebase/app';
import ListEvent from './eventList';
import CreateSH from './eventCreate';
import ActiveEvents from './eventsActive';

require('../../config')

export default class InstructorDash extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
      // console.log(this.props)
  }

  handleSignout = () => {
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
  this.props.navigation.navigate('Login')
}).catch(function(error) {
  // An error happened.
});
  }

render() {
    const { currentUser } = this.state
return (
      <View style={styles.container}>
        <Text>Instructor Dashboard</Text>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        {/* <CreateSH/> */}
        <ActiveEvents />
        <ListEvent />
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