import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

export default class EventItem extends Component {
    state = { sh: {} }

    componentDidMount() {
        let ac = this.props.navigation.state.params.accessCode
        console.log(this.props.navigation.state.params.accessCode)
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
          <View style={styles.container}>
            {sh.accessCode && 
              <View>
                <Text>{sh.name}</Text>
                {/* <DashNav /> */}
              </View>
            }
          </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })