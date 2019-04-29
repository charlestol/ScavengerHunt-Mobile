import React, { Component } from 'react';  
import { View, Text, Alert, Button, Picker, TextInput } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore'

require('../../config')
const db = firebase.firestore();

const INITIAL_STATE = {
    score: '',
    feedback: ''
}

export default class GiveScore extends Component {  

    state = { ...INITIAL_STATE }

    onSubmit = event => {
        const { score, feedback } = this.state;
        let self = this;
        
        let ac = this.props.ac;
        let email = this.props.email;
        let task = this.props.task;

        let data = {
            result: {
                score,
                feedback
            }
        }

        db.collection("scavengerHunts").doc(ac).collection('members').doc(email).collection('submissions').doc(task).update(data)
        .then(() => {
            self.setState({ 
                ...INITIAL_STATE
            })
            Alert.alert("Document successfully updated!");
        })
        .catch(error => {
            Alert.alert("Error updating document");
        });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }


  render() {
    const {   
        score,
        feedback
    } = this.state;

    // const isInvalid = score === '';

    return (
      <View>
        <Text>Give Score</Text>
        <Picker
            selectedValue={score}
            // style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
            this.setState({score: itemValue})
            }>
            <Picker.Item label="Correct" value={1} />
            <Picker.Item label="Incorrect" value={0} />
        </Picker>
        <TextInput
            placeholder="Type feedback here"
            autoCapitalize="none"
            //style={styles.textInput}
            onChange={this.onChange}
            value={feedback}
        />
        <Button title="Submit" onPress={this.onSubmit} />
      </View>
    );
  }
}