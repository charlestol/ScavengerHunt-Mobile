import React, { Component } from 'react';  
// import { View, Text, Button, StyleSheet } from 'react-native';
import { View, StyleSheet } from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  ListItem,
  List,
  H1
} from "native-base";
import firebase from 'firebase/app';
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();
import ListTasks from './taskList';
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


      <Container style={styles.container}>
      <Header>
      <Left>
            <Button 
              transparent 
              onPress={() => this.props.navigation.navigate('Student')}
              >
              <Icon name="arrow-back" />
            </Button>
        </Left>
        <Body>
          <Title>Dashboard</Title>
        </Body>
        <Right>
        <Button
            transparent
            onPress={this.showDialog}
          >
            <Icon name="add" />
          </Button>
        </Right>
      </Header>

      <Content style={styles.container}>
      {sh.accessCode && 
          <View>
             
            <H1>{sh.name}</H1>
            {closed && 
              <Text>This event has ended</Text>
            }
            <EventResults />
            {notStarted && <Text>The event has not started</Text>}
            {!notStarted && <ListTasks accessCode={sh.accessCode} />}
          </View>
        }
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


      // <View style={styles.container}>
      //   {sh.accessCode && 
      //     <View>
      //        <Button
      //           title={"back"}
      //           onPress={() => {
      //             this.props.navigation.navigate('Student')
      //           }}
      //         />
      //       <Text>{sh.name}</Text>
      //       {closed && 
      //         <Text>This event has ended</Text>
      //       }
      //       <EventResults />
      //       {notStarted && <Text>The event has not started</Text>}
      //       {!notStarted && <ListTasks accessCode={sh.accessCode} />}
      //     </View>
      //   }
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  content: {
    margin: 10
  },
  btnSpacing: {
    marginBottom: 10
  }
})