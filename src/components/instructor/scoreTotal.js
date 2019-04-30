import React, { Component } from 'react';  
import { View, Text, Alert, Button, TextInput } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore'

require('../../config')
const db = firebase.firestore();

export default class TotalScore extends Component {  
    state = { feedback: '', numOfTasks: null, totalScore: null }

    componentDidMount() {
        let self = this;
    
        let ac = this.props.ac;
        let email = this.props.email;
        let totalScore = 0;
        
        db.collection('scavengerHunts').doc(ac).get()
        .then(doc=> {
            let numOfTasks = doc.data().numOfTasks;
            let noneGraded = true;
            let noneGradedMark = '-';

            db.collection("scavengerHunts").doc(ac).collection('members').doc(email).collection('submissions').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let submission = doc.data();
                    if(submission.hasOwnProperty('result')) {
                        totalScore += Number(submission.result.score);
                        noneGraded = false;
                    }
                })
                
                if(noneGraded) {
                    totalScore = noneGradedMark;
                }

                this.setState({
                    totalScore,
                    numOfTasks
                })
            })
        })
        .catch(error => {
            // The document probably doesn't exist.
            Alert.alert("Error getting document");
        });
    }

    onSubmit = event => {
        const { totalScore, numOfTasks, feedback } = this.state;
        
        let ac = this.props.ac;
        let email = this.props.email;

        let data = {
            result: {
                score: `${totalScore}/${numOfTasks}`,
                feedback
            }
        }

        db.collection("scavengerHunts").doc(ac).collection('members').doc(email).get()
        .then(() => {
            this.setState({ 
                feedback: ''
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
        feedback,
        totalScore,
        numOfTasks
    } = this.state;

    return (
      <View>
        <Text>Total Score</Text>
        {totalScore === null && numOfTasks === null &&
            <Text>Total Score: -/-</Text>
        }
        {totalScore !== null && numOfTasks !== null &&
            <Text>Total Score: {`${totalScore}/${numOfTasks}`}</Text>
        }
        <View>
            <Text>Overall Feedback</Text>
            <TextInput
                placeholder="Type Feedback Here"
                autoCapitalize="none"
                // style={styles.textInput}
                onChangeText={this.onChange}
                value={feedback}
            />
        </View>
        <Button title="Submit Result" onPress={this.onSubmit}/>
                
      </View>
    );
  }
}