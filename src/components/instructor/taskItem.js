import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

export default class TaskItem extends Component {  
    state = {
        task: {}
    }

    componentDidMount() {
        let ac = this.props.navigation.state.params.accessCode
        let name = this.props.navigation.state.params.name
        // console.log(this.props.navigation.state.params.accessCode)
        db.collection("scavengerHunts").doc(ac).collection('tasks').doc(name).get()
        .then(doc => {
            // let task = {};
            if(doc.exists) {
                const data = doc.data();
                this.setState({
                    task: data
                });
            }
        });
    }

  render() {
    const {task} = this.state;
    let ac = this.props.navigation.state.params.accessCode
    return (
      <View style={styles.container}>
        <Text>Task Item</Text>
        <Text>{task.name}</Text>
        <Text>{task.instructions}</Text>
        <Button
            title='Back'
            onPress={() => {
                this.props.navigation.navigate('ITaskList', {
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