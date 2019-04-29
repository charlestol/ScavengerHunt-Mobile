import React, { Component } from 'react';  
import { View, Text, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase/app';
import 'firebase/firestore'

require('../../config')
const db = firebase.firestore();

class CompletionList extends Component {  
    state = {
        tasksCompleted: [],
        tasksInProgess: []
    }

    componentDidMount() {
        let ac = this.props.ac
        let email = this.props.email

        db.collection('scavengerHunts').doc(ac).collection('members').doc(email).collection('submissions')
        .onSnapshot(querySnapshot => {
            let tasksCompleted = [];
            let tasksInProgess = [];
      
            querySnapshot.forEach(doc => {
                let submission = doc.data();
                tasksCompleted.push(submission.taskName);
            });
        db.collection('scavengerHunts').doc(ac).collection('tasks').get()
        .then(querySnapshot => {
            let tasks = [];
            querySnapshot.forEach(doc => {
              let task = doc.data();
              tasks.push(task.name);
            });
    
            // console.log("Subs: ",tasksCompleted);
            // console.log("tasks: ",tasks);
    
            tasks.forEach(task => {
              if(!tasksCompleted.includes(task)) {
                tasksInProgess.push(task);
              }
            });
            
            this.setState({ 
              tasksCompleted,
              tasksInProgess,
            })
          });
        });
    }
    
  render() {
    const { tasksCompleted, tasksInProgess } = this.state;
    let ac = this.props.ac

    return (
      <View>
        <Text>Completion List</Text>
        <Text>Tasks Completed</Text>
        {tasksCompleted.map(task => (
            <View key={task}>
              <Button
                title={task}
                onPress={() => {
                  this.props.navigation.navigate('IMemberSubmission', {
                    accessCode: ac,
                    // email: member.email
                  })
                }}
              />
            </View>
          ))}

        <Text>Tasks In-Progress</Text>
        {tasksInProgess.map(task => (
            <View key={task}>
                <Text>{task}</Text>
            </View>
        ))}
      </View>
    );
  }
}

export default withNavigation(CompletionList)