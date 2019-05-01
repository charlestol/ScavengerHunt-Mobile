import React, { Component } from 'react'
// import { View, Text, Button, StyleSheet } from 'react-native'
import { View, StyleSheet, TextInput } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  ListItem,
  List,
  H1
} from "native-base";
import firebase from 'firebase/app'
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore()

export default class TaskResults extends Component {
    state = { score: '-', feedback: null }

    componentDidMount() {
        let ac = this.props.ac;
        let task = this.props.task;
        firebase.auth().onAuthStateChanged(user => {
            if(user === null) {
              return;
            }  
              
            db.collection('scavengerHunts').doc(ac).collection('members').doc(user.email).get()
            .then(doc => {
                let eventData = doc.data();
                // console.log(eventData)
                if(eventData.hasOwnProperty('result')) {
                    db.doc(`scavengerHunts/${ac}`).collection('members').doc(user.email).collection('submissions').doc(task).get()
                    .then(doc => {
                        if(doc.exists) {
                            let taskData = doc.data();
                            // console.log(taskData)
                            if(taskData.hasOwnProperty('result')) {
                                let score = taskData.result.score;
                                let feedback = taskData.result.feedback;
                                this.setState({
                                    score, 
                                    feedback,
                                })
                            } 
                        } 
                    })
                } 
            })
        })
    }
    //   componentWillUnmount() {
    //       this.unsubscribe();
    //   }

    render() {
        const { score, feedback} = this.state;

        return ( 
            <Content
            style={{marginTop: 40}}
            >
                <H1 style={{color:"blue"}}>Submission Review</H1>
                <H1>Score: {score}/1</H1>
                {feedback && <H1>{feedback}</H1>}
            </Content>
        )
    }
}
