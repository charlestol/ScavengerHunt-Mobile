import React, { Component } from 'react';  
// import { View, Text, Button } from 'react-native';
import { View } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  ListItem,
  List  
} from "native-base";
import { withNavigation } from 'react-navigation';
import firebase from 'firebase/app';
import 'firebase/firestore'
// import { Container } from 'native-base';
require('../../config')
const db = firebase.firestore();

class EventHistory extends Component {  

    state = { scavengerHunts: [] };

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
      if(user === null) {
        return;
      }  
        
      this.unsubscribe = db.collection('users').doc(user.email).collection('history')
      .onSnapshot(snapshot => {
        let scavengerHunts = [];

        snapshot.forEach(doc => {
          scavengerHunts.push({ ...doc.data() })
        });

        this.setState({
          scavengerHunts
        });
      });
      })
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

  render() {
    const { scavengerHunts } = this.state;
    return (

      <Container>
      <Text></Text>
      {scavengerHunts.map(scavengerHunt => (
          <View key={scavengerHunt.accessCode}>
            <Button
              style={{marginBottom: 10, marginLeft: 10, marginRight:10}}
              full
              bordered
              // title={scavengerHunt.name}
              onPress={() => {
                this.props.navigation.navigate('SEventItem', {
                  accessCode: scavengerHunt.accessCode,
                })
              }}
            > 
            <Text>
              {scavengerHunt.name}    
            </Text>
            </Button>
          </View>
          ))}
    </Container>

      // <View>
      //   <Text>User Event History</Text>
      //   {scavengerHunts.map(scavengerHunt => (
      //       <View key={scavengerHunt.accessCode}>
      //         <Button
      //           title={scavengerHunt.name}
      //           onPress={() => {
      //             this.props.navigation.navigate('SEventItem', {
      //               accessCode: scavengerHunt.accessCode,
      //             })
      //           }}
      //         />
      //       </View>
      //       ))}
      // </View>
    );
  }
}

export default withNavigation(EventHistory)