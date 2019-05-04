import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content, H1, H2 } from "native-base";
import firebase from "firebase/app";
import "firebase/firestore";
require("../../config");
const db = firebase.firestore();

export default class TaskResults extends Component {
  state = { score: "-", feedback: null };

  componentDidMount() {
    let ac = this.props.ac;
    let task = this.props.task;
    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        return;
      }

      db.collection("scavengerHunts")
        .doc(ac)
        .collection("members")
        .doc(user.email)
        .get()
        .then(doc => {
          let eventData = doc.data();
          // console.log(eventData)
          if (eventData.hasOwnProperty("result")) {
            db.doc(`scavengerHunts/${ac}`)
              .collection("members")
              .doc(user.email)
              .collection("submissions")
              .doc(task)
              .get()
              .then(doc => {
                if (doc.exists) {
                  let taskData = doc.data();
                  // console.log(taskData)
                  if (taskData.hasOwnProperty("result")) {
                    let score = taskData.result.score;
                    let feedback = taskData.result.feedback;
                    this.setState({
                      score,
                      feedback
                    });
                  }
                }
              });
          }
        });
    });
  }
  //   componentWillUnmount() {
  //       this.unsubscribe();
  //   }

  render() {
    const { score, feedback } = this.state;

    return (
      <Content>
        {/* <H1 style={{ color: "blue" }}>Submission Review</H1> */}
        <H2>Score: {score}/1</H2>
        {feedback && <H2>Comment: {feedback}</H2>}
      </Content>
    );
  }
}
