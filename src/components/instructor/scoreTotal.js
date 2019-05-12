import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
import {
  Content,
  Button,
  Form,
  Item,
  H1,
  Text,
  Input,
  View
} from "native-base";
import firebase from "firebase/app";
import "firebase/firestore";

require("../../config");
const db = firebase.firestore();

export default class TotalScore extends Component {
  state = { feedback: "", numOfTasks: null, totalScore: null };

  componentDidMount() {
    let self = this;

    let ac = this.props.ac;
    let email = this.props.email;
    let totalScore = 0;

    db.collection("scavengerHunts")
      .doc(ac)
      .get()
      .then(doc => {
        let numOfTasks = doc.data().numOfTasks;
        let noneGraded = true;
        let noneGradedMark = "-";

        db.collection("scavengerHunts")
          .doc(ac)
          .collection("members")
          .doc(email)
          .collection("submissions")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              let submission = doc.data();
              if (submission.hasOwnProperty("result")) {
                totalScore += Number(submission.result.score);
                noneGraded = false;
              }
            });

            if (noneGraded) {
              totalScore = noneGradedMark;
            }

            this.setState({
              totalScore,
              numOfTasks
            });
          });
      })
      .catch(error => {
        // The document probably doesn't exist.
        Alert.alert("Error getting document");
      });
  }

  onSubmit = () => {
    const { totalScore, numOfTasks, feedback } = this.state;

    let ac = this.props.ac;
    let email = this.props.email;

    let data = {
      result: {
        score: `${totalScore}/${numOfTasks}`,
        feedback
      }
    };

    db.collection("scavengerHunts")
      .doc(ac)
      .collection("members")
      .doc(email)
      .get()
      .then(() => {
        this.setState({
          feedback: ""
        });
        Alert.alert("Document successfully updated!");
      })
      .catch(error => {
        Alert.alert("Error updating document");
      });
  };

  render() {
    const isInvalid = this.state.feedback === "";

    return (
      <Content>
        {/* <Text>Total Score</Text> */}
        {this.state.totalScore === null && this.state.numOfTasks === null && (
          // <Text>Total Score: -/-</Text>
          <H1 style={{ marginBottom: 10 }}> -/-</H1>
        )}
        {this.state.totalScore !== null && this.state.numOfTasks !== null && (
          <H1 style={{ marginBottom: 10 }}>
            Total Score: {`${this.state.totalScore}/${this.state.numOfTasks}`}
          </H1>
        )}
        <View>
          <H1 style={{ color: "green" }}>Overall Feedback</H1>
          <Form  style={{marginBottom: 10}}>
            <Item>
              <Input
               
                placeholder="Type feedback here"
                autoCapitalize="none"
                onChangeText={feedback => this.setState({ feedback })}
                value={this.state.feedback}
              />
            </Item>
          </Form>
        </View>
        {/* <Button title="Submit Result" onPress={this.onSubmit} disabled={isInvalid}/> */}
        <Button 
            style={{marginBottom:10}}
            block danger 
            onPress={this.onSubmit} disabled={isInvalid}>
          <Text>Sumbit Result</Text>
        </Button>
      </Content>
    );
  }
}
