import React, { Component } from 'react';  
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';
import { withNavigation } from 'react-navigation'
import firebase from 'firebase/app'
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

class TaskList extends Component {
  state = {
    tasks: [],
    completed: []
  }

  componentDidMount() {
    let ac = this.props.accessCode
    let tasks = []
    let completedTasks = {}
    let completed = []

    firebase.auth().onAuthStateChanged(user => {
      if(user === null) {
          return
      }  
      db.collection('scavengerHunts').doc(ac).collection('members').doc(user.email).collection('submissions').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data()
          completedTasks[data.taskName] = data
          completed.push(data.taskName)
        })
        // console.log("comp ",completed)
        db.doc(`scavengerHunts/${ac}`).collection('tasks').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
              let data = doc.data()
              let taskName = data.name
              if(!completedTasks.hasOwnProperty(taskName)) {
                tasks.push(taskName)
              }
          })
          // console.log(tasks)

          this.setState({
            tasks,
            completed
          })
        })
      })
    })
  }

  render() {
    const { tasks, completed } = this.state;
    // console.log('list', tasks)

    return (
      <View>
        {tasks.length !== 0 && <Text>Tasks In-Progress</Text>}
        {tasks.length !== 0 && tasks.map(task => (
          <View key={task}>
            <Button
              title={task}
              onPress={() => {
                this.props.navigation.navigate('STaskItem', {
                  accessCode: this.props.accessCode,
                  taskName: task
                })
              }}
            />
          </View>
        ))}
        {completed.length !== 0 && <Text>Tasks Completed</Text>}
        {completed.length !== 0 && completed.map(task => (
          <View key={task}>
            <Button
              title={task}
              onPress={() => {
                this.props.navigation.navigate('STaskItem', {
                  accessCode: this.props.accessCode,
                  taskName: task
                })
              }}
            />            
          </View>
        ))}
      </View>
    )
  }
}
export default withNavigation(TaskList)