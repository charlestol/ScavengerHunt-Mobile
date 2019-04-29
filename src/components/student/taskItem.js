import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { withNavigation } from 'react-navigation'
import firebase from 'firebase/app'
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore()
import Submit from './submit'
// import TaskResult from './taskResult';

class TaskItem extends Component {
    state = {
        task: {}
    }
    componentDidMount() {
        let task = this.props.navigation.state.params.taskName
        let ac = this.props.navigation.state.params.accessCode
        this.setState({
            loading: true
        });
    
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
        return (
            <View>
                <Text>Task: {task.name}</Text>
                <Text>instructions: {task.instructions}</Text>
                <Text>Submission Type: {task.entryType}</Text>
                <Submit task={task} />
                {/* <TaskResult /> */}
            </View>
        );
    }
}

export default withNavigation(TaskItem)