import React, { Component } from 'react';  
import { Alert, Button, View, Text, StyleSheet, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker'
import firebase from 'firebase';
import 'firebase/firestore'
require('../config')
const db = firebase.firestore();

export default class CreateSH extends Component {  
    state = { name: '', accessCode: '', dateStart: null, dateEnd: null, instructions: ''}

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
            <DatePicker
              style={{width: 200}}
              date={this.state.dateStart}
              mode="date"
              placeholder="Select start date"
              format="YYYY-MM-DD"
    
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({dateStart: date})}}
            />
            <DatePicker
              style={{width: 200}}
              date={this.state.dateEnd}
              mode="date"
              placeholder="Select end date"
              format="YYYY-MM-DD"
    
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({dateEnd: date})}}
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