import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import GiveScore from './scoreTask';

import firebase from 'firebase/app';
import 'firebase/firestore'

require('../../config')
const db = firebase.firestore();

export default class Submission extends Component {  
  state = { type: '', submission: '', score: '-', feedback: null }

  componentDidMount() {
    let ac = this.props.navigation.state.params.accessCode
    let email = this.props.navigation.state.params.email
    let task = this.props.navigation.state.params.task

   db.collection("scavengerHunts").doc(ac).collection('members').doc(email).collection('submissions').doc(task).get()
   .then(doc => {
        let submitData = doc.data();
        let submission = '';
        let type = '';

        if(submitData.hasOwnProperty('textEntry')) {
            type = 'text';
            submission = submitData.textEntry;
        } else if(submitData.hasOwnProperty('imageURL')) {
            type = 'image';
            submission = submitData.imageURL;
        } 
       
        if(submitData.hasOwnProperty('result')) {
            let score = submitData.result.score;
            let feedback = submitData.result.feedback;
            this.setState({
                type,
                submission,
                score, 
                feedback,
            });
        } else {
            this.setState({
                type,
                submission,
            });
        }
    });
}

  render() {

    const { type, submission, score, feedback} = this.state;

    let ac = this.props.navigation.state.params.accessCode
    let email = this.props.navigation.state.params.email
    let task = this.props.navigation.state.params.task

    // console.log(this.props)
    return (
      <View style={styles.container}>
        <Text>Submission Review</Text>
        <View>
          <Text>Score: {score}/1</Text>
          {feedback && <Text>{feedback}</Text>}
        </View>
        {type==='image' && 
            <View>
                <Image source={{uri: submission}} style={{width: 100, height: 100}}/>
            </View>
        }
        {type==='text' && 
            <View>
                <Text>{submission}</Text>
            </View>
        }
        <GiveScore ac={ac} email={email} task={task} />
        <Button
            title='Back'
            onPress={() => {
                this.props.navigation.navigate('IMemberInfo', {
                    accessCode: ac,
                    email: email
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