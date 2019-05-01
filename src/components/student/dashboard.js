import React from 'react'
// import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import { StyleSheet, View } from 'react-native'

import {
  Container,
  Content,
  Header,
  Title,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Form,
  Item,
  Label,
  Input,
  // View,
  Badge,
  Tab,
  Tabs,
  List,
  ListItem
} from "native-base";
import SearchEvent from './eventSearch';
import ActiveEvents from './eventsActive';
import UserEventHistory from './eventHistory';
import firebase from 'firebase/app';
require('../../config')

export default class StudentDash extends React.Component {
  state = { currentUser: null}
  
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




  <Container style={styles.container}>
  <Header>
    <Body>
      <Title>Dashboard</Title>
    </Body>
    <Right>
    <Button
        transparent
        onPress={() => this.props.navigation.navigate('EventSearch')}
      >
        <Icon name="add" />
      </Button>
    </Right>
  </Header>
  <Tabs>
    <Tab heading="Active">
      <Content>
        <ActiveEvents />
        <SearchEvent />
      </Content>
    </Tab>
    <Tab heading="All">
    <Content>
      <UserEventHistory />
    </Content>
    </Tab>
  </Tabs>
  <Footer>
    <FooterTab>
      <Button
      onPress={() => this.props.navigation.navigate('DashboardS')}
      >
        <Icon  name="home" />
        <Text>Home</Text>
      </Button>
      <Button 
        onPress={() => this.props.navigation.navigate('ProfileS')}
      >
        <Icon name="person" />
        <Text>Profile</Text>
      </Button>
    </FooterTab>
  </Footer>
</Container>

      // <View style={styles.container}>
      //   <Text>Student Dashboard</Text>
      //   <Text>
      //     Hi {currentUser && currentUser.email}!
      //   </Text>
      //   <SearchEvent />
      //   <ActiveEvents />
      //   <UserEventHistory />
      //   <Button title="sign out" onPress={this.handleSignout}></Button>
      // </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
})
