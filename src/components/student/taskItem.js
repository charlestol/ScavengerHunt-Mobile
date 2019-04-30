import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import firebase from 'firebase/app'
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore()
import SubmitText from './submitText'
import SubmitImage from './submitImage'
import TaskResult from './taskResult';
import ViewSubmission from './viewSubmission'

class TaskItem extends Component {
    state = {
        task: {},
        closed: false
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

            // console.log(this.props)
            // on componentDidMount, if the event has ended, close submissions by no rendering the submission elements
            db.doc(`scavengerHunts/${ac}`).get()
            .then(doc => {
                // console.log("Document data:", doc.data());
                const sh = doc.data()
                const closed = sh.closed
                const endDate = sh.dateEnd.seconds
                // converting from millisec to sec to compare to endDate
                const today = (Date.now() / 1000).toFixed(0)
    
                if(today > endDate || closed) {
                    this.setState({
                        closed: true,
                    })
                } else {
                    this.setState({
                        closed: false,
                    })
                }
            }).catch(error => {
                this.setState({
                    error: error,
                    scavengerHunt: null
                })
                // console.log("Error getting document:", error);
            });
    
        
        });
    }

    render() {
        const {task, closed} = this.state;

        let ac = this.props.navigation.state.params.accessCode
        let taskName = this.props.navigation.state.params.taskName

        // console.log(task)
        return (
            <View style={styles.container} >
                <Text>Task: {taskName}</Text>
                <Text>instructions: {task.instructions}</Text>
                <Text>Submission Type: {task.entryType}</Text>
                {task.entryType==='text' && !closed &&
                    <Button 
                        title={"Submit Text"}
                        onPress={() => this.props.navigation.navigate("SubmitText",{
                            ac: ac,
                            task: taskName
                        })}
                    />
                }
                {task.entryType==='image' && !closed &&
                    <Button 
                        title={"Submit Image"}
                        onPress={() => this.props.navigation.navigate("SubmitImage",{
                            ac: ac,
                            task: taskName
                        })}
                    />
                }
                <TaskResult task={taskName} ac={ac} />
                <ViewSubmission ac={ac} task={taskName} />
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