import React, { Component } from "react";
import { Alert } from "react-native";

import { Content, Text, Button } from "native-base";
import firebase from "firebase/app";
import "firebase/firestore";
require("../../config");
const db = firebase.firestore();

export default class JoinEvent extends Component {
  handleJoin = () => {
    let self = this;
    // get user signed in
    firebase.auth().onAuthStateChanged(user => {
      // get user info from db
      if (user === null) {
        return;
      }
      db.collection("users")
        .doc(user.email)
        .get()
        .then(doc => {
          // user document data
          const user = doc.data();

          // event access code
          const ac = self.props.scavengerHunt.accessCode;

          const userData = {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            studentID: user.studentID
          };
          // console.log(user)
          // save user in event members collection
          db.collection("scavengerHunts")
            .doc(ac)
            .collection("members")
            .doc(user.email)
            .set(userData)
            .then(() => {
              db.collection("users")
                .doc(user.email)
                .collection("history")
                .doc(ac)
                .set(self.props.scavengerHunt)
                .then(() => {
                  console.log("User Successfully joined!");
                  // self.setState({
                  //     loading: false,
                  //     message: SUCCESS_MSG
                  // });
                  Alert.alert("Joined Successfully");
                });
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
              self.setState({
                error
              });
            });
        });
    });
  };

  render() {
    return (
      <Content>
        <Button
          block
          success
          style={{ marginTop: 10 }}
          title="Join"
          onPress={this.handleJoin}
        >
          <Text> Join </Text>
        </Button>
      </Content>
    );
  }
}
