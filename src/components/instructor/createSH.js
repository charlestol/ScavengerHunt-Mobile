import React, { Component } from 'react';  
import { Alert, Button, View, Text, StyleSheet, TextInput } from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import DatePicker from 'react-native-datepicker'
import firebase from 'firebase/app';
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

export default class CreateSH extends Component {  
    state = { name: '', accessCode: '', dateStart: null, dateEnd: null, instructions: '', selectedStartHours: 0,
    selectedStartMinutes: 0, selectedEndHours: 0, selectedEndMinutes: 0}

    onCreateEvent = () => {
      const {name, accessCode, dateStart, dateEnd, instructions, selectedStartHours,
        selectedStartMinutes, selectedEndHours, selectedEndMinutes} = this.state;

        let start = `${dateStart.toString()} ${selectedStartHours}:${selectedStartMinutes}`
        let end = `${dateEnd.toString()} ${selectedEndHours}:${selectedEndMinutes}`
        // firebase.firestore.Timestamp.fromDate(new Date(start))

      firebase.auth().onAuthStateChanged(user => {
        const eventData = {
          name, accessCode, dateStart: start, dateEnd: end, instructions, email: user.email
        }
        
        db.collection('scavengerHunts').doc(accessCode).set(eventData)
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
            <TimePicker
              selectedHours={this.state.selectedStartHours}
              //initial Hourse value
              selectedMinutes={this.state.selectedStartMinutes}
              //initial Minutes value
              onChange={(hours, minutes) => this.setState({ 
                selectedStartHours: hours, selectedStartMinutes: minutes 
              })}
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
            <TimePicker
              selectedHours={this.state.selectedEndHours}
              //initial Hourse value
              selectedMinutes={this.state.selectedEndMinutes}
              //initial Minutes value
              onChange={(hours, minutes) => this.setState({ 
                selectedEndHours: hours, selectedEndMinutes: minutes 
              })}
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