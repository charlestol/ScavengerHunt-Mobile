import React, { Component } from 'react';  
// import { View, Text, StyleSheet, Button } from 'react-native';
import { View, StyleSheet} from 'react-native';

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
  // View,
  Badge,
  Tab,
  Tabs,
  List,
  ListItem
} from "native-base";
import firebase from 'firebase/app';
import 'firebase/firestore'

require('../../config')
const db = firebase.firestore();

export default class ListMember extends Component {  
    state = {members: []}

    componentDidMount() {
        let ac = this.props.navigation.state.params.accessCode
        // console.log(this.props.navigation.state.params.accessCode)
        this.unsubscribe = db.collection("scavengerHunts").doc(ac).collection('members')
        .onSnapshot(querySnapshot => {
            let members = [];
            querySnapshot.forEach(doc => {
                let data = doc.data();
                members.push(data);
            });
            // console.log(querySnapshot)
            this.setState({
              members,
            });
          });
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

  render() {
    //   console.log('list')
    let ac = this.props.navigation.state.params.accessCode
    const { members } = this.state;
    return (

      <Container style={styles.container}>
      <Header>
      <Left>
          <Button 
            transparent 
            // onPress={() => this.props.navigation.navigate('IEventItem')}
            onPress={() => {
              this.props.navigation.navigate('IEventItem', {
                  accessCode: ac
              })
          }}
            >
            <Icon name="arrow-back" />
          </Button>
      </Left>
        <Body>
          <Title>Member List</Title>
        </Body>
      </Header>

      <Content style={styles.content}>
        <H2></H2>
          {members.map(member => (
            <View key={member.email}>
              <Button
              style={{marginBottom: 10}}
               block
                onPress={() => {
                  this.props.navigation.navigate('IMemberInfo', {
                    accessCode: ac,
                    email: member.email
                  })
                }}
              > 
              <Text>
              {member.name}
              </Text>
              </Button>
            </View>
          ))}
        {/* <Button
            title='Back'
            onPress={() => {
                this.props.navigation.navigate('IEventItem', {
                    accessCode: ac
                })
            }}
        > 
        <Text>Back</Text>
        </Button>   */}
      </Content>

      <Footer>
        <FooterTab>
          <Button onPress={() => this.props.navigation.navigate('DashboardT')}>
            <Icon name="home" />
            <Text>Home</Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate('ProfileT')}>
            <Icon name="person" />
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>

      // <View style={styles.container}>
      //   <Text>Member List</Text>
      //   {members.map(member => (
      //       <View key={member.email}>
      //         <Button
      //           title={member.name}
      //           onPress={() => {
      //             this.props.navigation.navigate('IMemberInfo', {
      //               accessCode: ac,
      //               email: member.email
      //             })
      //           }}
      //         />
      //       </View>
      //     ))}
      //   <Button
      //       title='Back'
      //       onPress={() => {
      //           this.props.navigation.navigate('IEventItem', {
      //               accessCode: ac
      //           })
      //       }}
      //   />  
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
    content: {
      margin: 10
    }
  })