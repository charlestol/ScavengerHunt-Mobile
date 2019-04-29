import React, { Component } from 'react';  
import { View, Text, Alert, Button, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'

import firebase from 'firebase/app';
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore();

class EventResults extends Component {
    state = { score: null, feedback: null }

    componentDidMount() {
        let ac = this.props.navigation.state.params.accessCode
        // this.setState({ loading: true })
        firebase.auth().onAuthStateChanged(user => {
            if(user === null) {
                return;
              }  
            db.doc(`scavengerHunts/${ac}`).collection("members").doc(user.email).get()
            .then(doc => {
                let data = doc.data();
                if(data.hasOwnProperty('result')) {
                    let score = data.result.score
                    let feedback = data.result.feedback
                    this.setState({
                        score, 
                        feedback
                    })
                }
            })
        })
    }

    render() {
        const { score, feedback} = this.state

        return ( 
            <View>                
                {score && 
                    <View>
                        <Text>Event Review</Text>
                        <View>
                            <Text>Score: {score}</Text>
                            {feedback && <Text>Feedback: {feedback}</Text>}
                        </View>
                    </View>
                }
            </View>
        )
    }
}

export default withNavigation(EventResults)
