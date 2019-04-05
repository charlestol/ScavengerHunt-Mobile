import React, { Component } from 'react';  
import { Alert, Button, View, Text, StyleSheet, TextInput } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore'
require('../config')
const db = firebase.firestore();

export default class CreateSH extends Component {  
    state = { name: '', accessCode: '', instructions: ''}

    onCreateEvent = () => {
      const {name, accessCode, instructions} = this.state;

      firebase.auth().onAuthStateChanged(user => {
        const eventData = {
          name, accessCode, instructions, email: user.email
        }
        db.collection('test').doc(name).set(eventData)
        .then(() => {
            console.log("Document successfully written!");
            Alert.alert('Event Created');
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            // this.setState({error})
        });
      })
    }

    render() {
        return (
        <View>
            <Text>Creating SH</Text>
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Event Name"
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
            />
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Access Code"
                onChangeText={accessCode => this.setState({ accessCode })}
                value={this.state.accessCode}
            />
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Event Instructions"
                onChangeText={instructions => this.setState({ instructions })}
                value={this.state.instructions}
            />
            <Button title="Create" onPress={this.onCreateEvent} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
  })