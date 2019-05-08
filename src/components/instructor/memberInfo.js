import React, { Component } from 'react';  
// import { View, Text, StyleSheet, Button } from 'react-native';
import { View, StyleSheet } from 'react-native';

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
  H1,
  // View,
  Badge,
  Tab,
  Tabs,
  List,
  ListItem
} from "native-base";
import MemTaskList from './memberTaskList';
import TotalScore from './scoreTotal';

import firebase from 'firebase/app';
import 'firebase/firestore'

require('../../config')
const db = firebase.firestore();

export default class MemberInfo extends Component {  
  state = { memberInfo: null }
  componentDidMount() {
    let ac = this.props.navigation.state.params.accessCode
    let email = this.props.navigation.state.params.email

    db.collection("scavengerHunts").doc(ac).collection('members').doc(email).get()
    .then(doc => {
      const memberInfo = doc.data()
      // console.log(memberInfo)
      this.setState({ memberInfo })
    })
  }

  render() {
    const { memberInfo } = this.state;
    let ac = this.props.navigation.state.params.accessCode
    let email = this.props.navigation.state.params.email
    return (


<Container style={styles.container}>
        <Header>
        <Left>
            <Button 
              transparent 
              onPress={() => {
                this.props.navigation.navigate('IMemberList', {
                    accessCode: ac
                })
            }}
              >
              <Icon name="arrow-back" />
            </Button>
        </Left>
          <Body>
            <Title>Member Info</Title>
          </Body>
        </Header>

      <Content style={{margin:10}}>
        <H1></H1>
        {memberInfo &&
          <View>
            <H1>{memberInfo.name}</H1>
            <H1>{memberInfo.email}</H1>
            {/* <Text>{memberInfo.name}</Text>
            <Text>{memberInfo.email}</Text> */}
            <TotalScore ac={ac} email={email} />
            <MemTaskList ac={ac} email={email}/>
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
      //   <Text>Member Info</Text>
      //   {memberInfo &&
      //     <View>
      //       <Text>{memberInfo.name}</Text>
      //       <Text>{memberInfo.email}</Text>
      //       <TotalScore ac={ac} email={email} />
      //       <MemTaskList ac={ac} email={email}/>
      //     </View>
      //   }

      //   <Button
      //       title='Back'
      //       onPress={() => {
      //           this.props.navigation.navigate('IMemberList', {
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
  }
})