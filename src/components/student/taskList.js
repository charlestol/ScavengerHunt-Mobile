import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Content, Text, Button, H2 } from "native-base";
import { withNavigation } from "react-navigation";
import firebase from "firebase/app";
import "firebase/firestore";
require("../../config");
const db = firebase.firestore();

class TaskList extends Component {
  state = {
    tasks: [],
    completed: []
  };

  componentDidMount() {
    let ac = this.props.accessCode;
    let tasks = [];
    let completedTasks = {};
    let completed = [];

    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        return;
      }
      db.collection("scavengerHunts")
        .doc(ac)
        .collection("members")
        .doc(user.email)
        .collection("submissions")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let data = doc.data();
            completedTasks[data.taskName] = data;
            completed.push(data.taskName);
          });
          // console.log("comp ",completed)
          db.doc(`scavengerHunts/${ac}`)
            .collection("tasks")
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                let data = doc.data();
                let taskName = data.name;
                if (!completedTasks.hasOwnProperty(taskName)) {
                  tasks.push(taskName);
                }
              });
              // console.log(tasks)

              this.setState({
                tasks,
                completed
              });
            });
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { tasks, completed } = this.state;
    // console.log('list', tasks)

    return (
      <Content style={{ margin: 10 }}>
        {tasks.length !== 0 && (
          <H2 style={{ marginBottom: 10 }}>In-Progress</H2>
        )}
        {tasks.length !== 0 &&
          tasks.map(task => (
            <View key={task}>
              <Button
                style={{ marginBottom: 10 }}
                block
                warning
                rounded
                bordered
                onPress={() => {
                  this.props.navigation.navigate("STaskItem", {
                    accessCode: this.props.accessCode,
                    taskName: task
                  });
                }}
              >
                <Text>{task} </Text>
              </Button>
            </View>
          ))}
        {completed.length !== 0 && (
          <H2 style={{ marginBottom: 10 }}>Completed</H2>
        )}
        {completed.length !== 0 &&
          completed.map(task => (
            <View key={task}>
              <Button
                style={{ marginBottom: 10 }}
                block
                success
                rounded
                bordered
                onPress={() => {
                  this.props.navigation.navigate("STaskItem", {
                    accessCode: this.props.accessCode,
                    taskName: task
                  });
                }}
              >
                <Text>{task}</Text>
              </Button>
            </View>
          ))}
      </Content>
    );
  }
}
export default withNavigation(TaskList);
