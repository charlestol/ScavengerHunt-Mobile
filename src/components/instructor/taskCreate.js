import React, { Component } from 'react';  
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore'

require('../../config')
const db = firebase.firestore();

const INITIAL_STATE = {
    name: '',
    instructions: '',
    entryType: 'image'
}

export default class CreateTask extends Component {  
    state = { ...INITIAL_STATE };

    onCreateTask = () => {
        const {
            name,
            instructions,
            entryType,
        } = this.state;        
        
        let taskData = {
            name,
            instructions,
            entryType,
        };

        const accessCode = this.props.ac

        db.collection('scavengerHunts').doc(accessCode).collection('tasks').doc(name).set(taskData)
        .then(() => {
            db.collection('scavengerHunts').doc(accessCode).update({
                numOfTasks: firebase.firestore.FieldValue.increment(1)
            })
            .then(() => {
                // console.log("Document successfully written!");
                Alert.alert('Task Successfully Created');
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                // console.error("Error writing document: ", error);
                Alert.alert('Creating Task Unsuccessful');
            });
        })
        .catch(error => {
            // console.error("Error writing document: ", error);
            Alert.alert('Creating Task Unsuccessful');
        });

    }
  render() {
    //   console.log(accessCode)
    return (
      <View>
        <Text>Create Task</Text>
        <TextInput
          placeholder="Task Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <TextInput
          placeholder="Task Instructions"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={instructions => this.setState({ instructions })}
          value={this.state.instructions}
        />
        <Text>Select Entry Type</Text>
        <Picker
            selectedValue={this.state.entryType}
            onValueChange={(itemValue, itemIndex) =>
            this.setState({entryType: itemValue})
            }>
            <Picker.Item label="Image" value="image" />
            <Picker.Item label="Text" value="text" />
        </Picker>
        <Button title="Add Task" onPress={this.onCreateTask}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center'
    // },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
  })
  