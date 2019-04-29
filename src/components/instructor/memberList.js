import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore'

require('../../config')
const db = firebase.firestore();

export default class ListMember extends Component {  
    state = {members: []}

    componentDidMount() {
        let ac = this.props.navigation.state.params.accessCode
        // console.log(this.props.navigation.state.params.accessCode)
        db.collection("scavengerHunts").doc(ac).collection('members')
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

  render() {
    //   console.log('list')
    let ac = this.props.navigation.state.params.accessCode
    const { members } = this.state;
    return (
      <View style={styles.container}>
        <Text>Member List</Text>
        {members.map(member => (
            <View key={member.email}>
              <Button
                title={member.name}
                onPress={() => {
                  this.props.navigation.navigate('IMemberInfo', {
                    accessCode: ac
                  })
                }}
              />
            </View>
          ))}
        <Button
            title='Back'
            onPress={() => {
                this.props.navigation.navigate('IEventItem', {
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