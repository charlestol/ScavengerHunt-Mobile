import React, { Component } from 'react';
// import { View, Text, Button } from 'react-native';
import { View} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
} from "native-base";
import firebase from 'firebase/app';
import { withNavigation } from 'react-navigation';

import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

class ListEvent extends Component {  
    state = { scavengerHunts: [] };

    componentDidMount() {
      this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if(user === null) {
        return;
      }  
        
        
      unsubscribe = db.collection('scavengerHunts').where("email", "==", user.email)
      .onSnapshot(snapshot => {
        let scavengerHunts = [];

        snapshot.forEach(doc => {
          scavengerHunts.push({ ...doc.data() })
        });

        this.setState({
          scavengerHunts
        });
      });})
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
              onPress={() => {
                this.props.navigation.navigate('IEventItem', {
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
        //   <Text>List Event</Text>
        //   {scavengerHunts.map(scavengerHunt => (
        //     <View key={scavengerHunt.accessCode}>
        //       <Button
        //         title={scavengerHunt.name}
        //         onPress={() => {
        //           this.props.navigation.navigate('IEventItem', {
        //             accessCode: scavengerHunt.accessCode,
        //           })
        //         }}
        //       />
        //     </View>
        //   ))}
        // </View>
      );
    }
  }

  export default withNavigation(ListEvent)
