import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';
import MemTaskList from './memberTaskList';
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
      const memberInfo = doc.data();
      // console.log(memberInfo)
      this.setState({ memberInfo })
    })
  }
  render() {
    const { memberInfo } = this.state;
    let ac = this.props.navigation.state.params.accessCode
    let email = this.props.navigation.state.params.email
    return (
      <View style={styles.container}>
        <Text>Member Info</Text>
        {memberInfo &&
          <View>
            <Text>{memberInfo.name}</Text>
            <Text>{memberInfo.email}</Text>
            {/* <TotalScore ac={ac} email={email} /> */}
            <MemTaskList ac={ac} email={email}/>
          </View>
        }

        <Button
            title='Back'
            onPress={() => {
                this.props.navigation.navigate('IMemberList', {
                    accessCode: ac
                })
            }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})