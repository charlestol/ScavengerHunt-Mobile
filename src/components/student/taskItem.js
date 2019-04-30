import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import firebase from 'firebase/app'
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore()
import Submit from './submit'
import TaskResult from './taskResult';

class TaskItem extends Component {
    state = {
        task: {}
    }
    componentDidMount() {
        let task = this.props.navigation.state.params.taskName
        let ac = this.props.navigation.state.params.accessCode
        db.doc(`scavengerHunts/${ac}`).collection('tasks').doc(task).get()
        .then(doc => {
            const data = doc.data()
            this.setState({
                task: data
            });
        });
    }

    render() {
        const {task} = this.state;

        let ac = this.props.navigation.state.params.accessCode
        let taskName = this.props.navigation.state.params.taskName

        // console.log(task)
        return (
            <View style={styles.container} >
                <Text>Task: {taskName}</Text>
                <Text>instructions: {task.instructions}</Text>
                <Text>Submission Type: {task.entryType}</Text>
                <Submit task={taskName} ac={ac} />
                <TaskResult task={taskName} ac={ac} />
                <Button
                title={"back"}
                onPress={() => {
                  this.props.navigation.navigate('SEventItem', {
                      accessCode: ac
                  })
                }}
              />
            </View>
        );
    }
}

export default withNavigation(TaskItem)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })