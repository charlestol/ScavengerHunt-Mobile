import React from 'react'
// import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import { StyleSheet, View } from 'react-native'
import Dialog from "react-native-dialog";
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
  H1,
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
  state = { currentUser: null, dialogVisible: false }
  showDialog = () => {
    this.setState({ dialogVisible: false });
  };
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
  handleAdd = () => {
    this.setState({ dialogVisible: false });
  };

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
      <Title>Profile</Title>
    </Body>
    <Right>
    <Button 
    transparent
    onPress={this.handleSignout} >
        <Text> Signout </Text>
    </Button>
    </Right>
  </Header>
  <Content
    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
    <H1>
        {currentUser && currentUser.email}
    </H1>
  </Content>
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

    )
  }
}
const styles = StyleSheet.create({
  container: {

  }
})