import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Content,
  Button,
  Form,
  Item,
  H1,
  H3,
  Text,
  Input,
  View
} from "native-base";
import { withNavigation } from "react-navigation";
import firebase from "firebase/app";
import "firebase/firestore";

require("../../config");
const db = firebase.firestore();

class CompletionList extends Component {
  state = {
    tasksCompleted: [],
    tasksInProgess: []
  };

  componentDidMount() {
    let ac = this.props.ac;
    let email = this.props.email;

    this.unsubscribe = db
      .collection("scavengerHunts")
      .doc(ac)
      .collection("members")
      .doc(email)
      .collection("submissions")
      .onSnapshot(querySnapshot => {
        let tasksCompleted = [];
        let tasksInProgess = [];

        querySnapshot.forEach(doc => {
          let submission = doc.data();
          tasksCompleted.push(submission.taskName);
        });
        db.collection("scavengerHunts")
          .doc(ac)
          .collection("tasks")
          .get()
          .then(querySnapshot => {
            let tasks = [];
            querySnapshot.forEach(doc => {
              let task = doc.data();
              tasks.push(task.name);
            });

            tasks.forEach(task => {
              if (!tasksCompleted.includes(task)) {
                tasksInProgess.push(task);
              }
            });

            this.setState({
              tasksCompleted,
              tasksInProgess
            });
          });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { tasksCompleted, tasksInProgess } = this.state;
    let ac = this.props.ac;
    let email = this.props.email;

    return (
      <Content>
        {/* <Text>Completion List</Text> */}
        <H3 style={{ marginBottom: 10, marginTop:25 }}>Completed</H3>
        {tasksCompleted.map(task => (
          <View key={task}>
            <Button
              style={{ marginBottom: 10 }}
              block
              rounded
              success
              title={task}
              onPress={() => {
                this.props.navigation.navigate("IMemberSubmission", {
                  accessCode: ac,
                  email: email,
                  task: task
                });
              }}
            >
              <Text>{task}</Text>
            </Button>
          </View>
        ))}

        <H3 style={{marginBottom: 10}}>In-Progress</H3>
        {tasksInProgess.map(task => (
          <View key={task}>
            <Button
              style={{ marginBottom: 10 }}
              block
              bordered
              rounded
              warning
              title={task}
            >
              <Text>{task}</Text>
            </Button>

            {/* <Text>{task}</Text> */}
          </View>
        ))}
      </Content>
    );
  }
}

export default withNavigation(CompletionList);
