import React from 'react'
import firebase from 'firebase';
import {Text, Button } from 'react-native'
import {Container} from 'native-base';
import SearchEvent from '../components/SearchEvent';
import UserEventHistory from '../components/UserEventHistory';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import AppBody from '../components/AppBody';
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
        
      <Container>
        <AppHeader/>
        <AppBody/>
        <Button title="sign out" onPress={this.handleSignout}></Button>
        <AppFooter/>
        {/* <Text>Student Dashboard</Text>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <SearchEvent/>
        <UserEventHistory/>
        <Button title="sign out" onPress={this.handleSignout}></Button>  */}
      </Container>
    )
  }
}