import React, { Component } from 'react'; 
import { View, Text, TextInput, Alert, Button, StyleSheet, Image} from 'react-native'
import { withNavigation } from 'react-navigation'
import firebase from 'firebase/app'
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore()
import ViewSubmission from './viewSubmission'

const SUCCESS_MSG = "Submitted!"
const ERROR_MSG = "Error, try submitting again."
// const ERROR_MSG = "This scavenger hunt event is closed. Contact the instructor for more information."

export default class Submit extends Component {
    // Initial state
   state = { 
       message: null, 
       textEntry: '', 
       image: null, 
       imageURL: '', 
       progress: 0, 
       submitted: false,
       closed: false 
    }

    componentDidMount() {
        let accessCode = this.props.ac
        // console.log(this.props)
        // on componentDidMount, if the event has ended, close submissions by no rendering the submission elements
        db.doc(`scavengerHunts/${accessCode}`).get()
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

    }

    onSubmitText = () => {
        // array destructuring so state exists in this function
        const { textEntry } = this.state
        // grabbing the access code from the route
        let accessCode = this.props.ac
        // getting the task information from the task parent
        let task = this.props.task

        firebase.auth().onAuthStateChanged(user => {
            if(user === null) {
                return
            }  
            // Data to be saved to the database
            const submitData = {
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                studentID: user.studentID,
                textEntry,
                taskName: task,
            }
            // save data in a task's submission collection
            db.doc(`scavengerHunts/${accessCode}`).collection('tasks').doc(task).set(submitData)
            .then(() => {
                // console.log("Submission Successful!");
                Alert.alert(SUCCESS_MSG)
                this.setState({
                    message: SUCCESS_MSG,
                    submitted: true
                })
            })
            .catch(function(error) {
                // console.error("Error writing document: ", error);
                Alert.alert(ERROR_MSG)
                this.setState({
                    message: ERROR_MSG                
                })
            })
        })
    }

    onSubmitImage = () => {
        // array destructuring so state exists in this function
        const { image } = this.state;
        // grabbing the access code from the route
        let accessCode = this.props.ac;
        // getting the task information from the task parent
        let task = this.props.task;

        // prepare image to be store to this storage path
        const uploadTask = firebase.store.ref(`${accessCode}/${task}/${image.name}`).put(image);
        // perform image upload
        uploadTask.on('state_changed', 
        snapshot => {
            // progress function
            const progress = Math.round(( snapshot.bytesTransferred / snapshot.totalBytes ) * 100)
            this.setState({ progress })
        }, 
        error => {
            // error function
            console.log(error);
        }, 
        () => {
            // complete function
            // get the URL of where the image is stored, will be used for viewing when doing <img src={url} />
            firebase.store.ref(`${accessCode}/${task}`).child(image.name).getDownloadURL()
            .then(imageURL => {
                console.log(imageURL)
                this.setState({ imageURL })
                // Data to be saved to the database
                firebase.auth().onAuthStateChanged(user => {
                    if(user === null) {
                        return
                    }  
                    const submitData = {
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        studentID: user.studentID,
                        imageURL,
                        taskName: task,
                    }
                    // save data in a task's submission collection
                    db.doc(`scavengerHunts/${ac}`).collection('tasks').doc(task).set(submitData)
                    .then(() => {
                        // console.log("Submission Successful!");
                        Alert.alert(SUCCESS_MSG)
                        this.setState({
                            message: SUCCESS_MSG,
                            submitted: true
                        })
                    })
                    .catch(function(error) {
                        // console.error("Error writing document: ", error);
                        Alert.alert(ERROR_MSG)
                        this.setState({
                            message: ERROR_MSG                
                        })
                    })
                })
            })
        });
    }

    // onChangeText = () => {
    //     this.setState({ textEntry: event.target.value });
    // };

    // onChangeImage = () => {
    //     if(event.target.files[0]) {
    //         const image = event.target.files[0]
    //         this.setState({ image })
    //         console.log(image);
    //     }
    // }

    render() {
        const {
            message, textEntry, image, progress, imageURL, submitted, closed
        } = this.state;

        const noImage = image === null;
        const noText = textEntry === '';

        // grabbing the access code from the route
        let accessCode = this.props.ac
        // getting the task information from the task parent
        let task = this.props.task

        return (
            <View>
                {this.props.task.entryType==="text" && !closed &&
                    <View> 
                        <TextInput
                            onChange={textEntry => this.setState({ textEntry })}
                            type="text"
                            placeholder="Type Here"
                        />
                        <Button 
                            disabled={noText} 
                            title="Submit" 
                            onPress={() => this.onSubmitText()} 
                        />
                        {submitted && 
                            <View>
                                <Text>Submitted Text: </Text>
                                <Text>{textEntry}</Text>
                            </View>    
                        }
                    </View>
                }
                {this.props.task.entryType==="image" && !closed &&
                    <View> 
                        {/* <progress value={progress} max="100" /> */}
                        {/* <TextInput
                            onChange={this.onChangeImage}
                            type="file"
                        /> */}
                       {/* <Button 
                            disabled={noImage} 
                            title="Submit" 
                            onPress={() => this.onSubmitImage()} 
                        /> */}
                        {/* Preview the image that was just uploaded */}
                        {submitted && <Image source={{uri: imageURL}} style={{height:100, width:100}} />}
                    </View>
                }
                <ViewSubmission ac={accessCode} task={task} />
            </View>
        )
    }
}


