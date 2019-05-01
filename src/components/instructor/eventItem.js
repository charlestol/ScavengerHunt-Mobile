import React, { Component } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
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
  H2,
  ListItem,
  List,
  Tab,
  Tabs
} from "native-base";
import firebase from 'firebase/app';
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

export default class EventItem extends Component {
    state = { sh: {} }

    componentDidMount() {
        let ac = this.props.navigation.state.params.accessCode
        // console.log(this.props.navigation.state.params.accessCode)
        db.collection("scavengerHunts").doc(ac).get()
        .then(doc => {
            const data = doc.data();
            this.setState({
              sh: data,
              loading: false
            })
        })
    }
    render() {
        const { sh } = this.state;
        return (


        <Container style={styles.container}>
        <Header>
        <Left>
            <Button 
              transparent 
              onPress={() => this.props.navigation.navigate('Instructor')}
              >
              <Icon name="arrow-back" />
            </Button>
        </Left>
          <Body>
            <Title>Event</Title>
          </Body>
        </Header>
        <Content style={styles.content}>
            {sh.accessCode && 
              <View>
                <H2 style={{marginBottom: 10}}>{sh.name}</H2>
                {/* <DashNav /> */}
                <Button
                  style={styles.btnSpacing}
                  block
                  onPress={() => {
                    this.props.navigation.navigate('IMemberList', {
                      accessCode: sh.accessCode
                    })
                  }}
                >
                <Text>Members</Text>
                </Button>
                <Button
                  style={styles.btnSpacing}
                  block
                  onPress={() => {
                    this.props.navigation.navigate('ITaskList', {
                      accessCode: sh.accessCode
                    })
                  }}
                > 
                <Text>Tasks</Text>
                </Button>

                {/* <Button
                  title='Back'
                  onPress={() => {
                    this.props.navigation.navigate('Instructor')
                  }}
              /> */}

              </View>
            }
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
          //   {sh.accessCode && 
          //     <View>
          //       <Text>{sh.name}</Text>
          //       {/* <DashNav /> */}
          //       <Button
          //         title='Members'
          //         onPress={() => {
          //           this.props.navigation.navigate('IMemberList', {
          //             accessCode: sh.accessCode
          //           })
          //         }}
          //       />
          //        <Button
          //         title='Tasks'
          //         onPress={() => {
          //           this.props.navigation.navigate('ITaskList', {
          //             accessCode: sh.accessCode
          //           })
          //         }}
          //       />
          //       <Button
          //         title='Back'
          //         onPress={() => {
          //           this.props.navigation.navigate('Instructor')
          //         }}
          //     />
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