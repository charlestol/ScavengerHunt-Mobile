import React, { Component } from 'react';  
// import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';
import { StyleSheet, View, TextInput } from 'react-native'
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
  H2,
  H1,
  // View,
  Badge,
  Tab,
  Tabs,
  List,
  ListItem
} from "native-base";
import JoinEvent from './eventJoin';
import firebase from 'firebase/app'
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

const ERROR_DOES_NOT_EXIST = "Invalid access code entered. Either the event has ended, it was mis-typed or it does not exist. Contact your instructor for verification."

export default class SearchEvent extends Component { 
  state = {accessCode: '', scavengerHunt: null, closed: false, error: null} 
  
  onSearch = () => {
    const { accessCode } = this.state

    db.collection('scavengerHunts').doc(accessCode).get()
      .then(doc => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          const sh = doc.data();
          const closed = sh.closed;

          if(!closed) {
            this.setState({
              scavengerHunt: sh,
              closed: false,
              error: null
            })
          } 
          else {
            this.setState({
            scavengerHunt: null,
            closed: true,
            error: null
            })
          }
        } 
        else {
          // doc.data() will be undefined in this case
          console.log("No such document!", ERROR_DOES_NOT_EXIST);
          this.setState({
            error: ERROR_DOES_NOT_EXIST,
            scavengerHunt: null,
            closed: false
          })
        }
      }).catch(error => {
          this.setState({
            error: error,
            scavengerHunt: null
          })
          console.log("Error getting document:", error);
      });


  }

  render() {
    const {accessCode, closed, scavengerHunt, error} = this.state;
    const disabled = accessCode==='';
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
          <Title>Search</Title>
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

      <Content style={{margin:10}}>
        <H2>Search Event</H2>
        <Form
        style={{marginBottom: 10, marginBottom: 10}}
        >
          <Item>
            <Input 
            onChangeText={accessCode => this.setState({ accessCode })}
            value={this.state.accessCode}
            placeholder="Input access code" 
            />
          </Item>
        </Form>

        {/* <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Access Code"
          onChangeText={accessCode => this.setState({ accessCode })}
          value={this.state.accessCode}
        /> */}
        <Button 
          block
          bordered onPress={this.onSearch} disabled={disabled} >
        <Text>Search</Text>
        </Button>
        {scavengerHunt && !closed &&
          <View style={{marginTop: 20}}>
            <H1>Event Name: {scavengerHunt.name}</H1>
            <JoinEvent scavengerHunt={scavengerHunt} />
          </View>
        }
        {error && <Text>{error}</Text>}
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

      // <View>
      //   <Text>Search Event</Text>
      //   <TextInput
      //     style={styles.textInput}
      //     autoCapitalize="none"
      //     placeholder="Access Code"
      //     onChangeText={accessCode => this.setState({ accessCode })}
      //     value={this.state.accessCode}
      //   />
      //   <Button title="Search" onPress={this.onSearch} disabled={disabled} />
      //   {scavengerHunt && !closed &&
      //     <View>
      //       <Text>{scavengerHunt.name}</Text>
      //       <JoinEvent scavengerHunt={scavengerHunt} />
      //     </View>
      //   }
      //   {error && <Text>{error}</Text>}
      // </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})