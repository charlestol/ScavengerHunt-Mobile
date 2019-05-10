import React, { Component } from "react";
import { Image } from "react-native";
import { Content, Text, View, H2 } from "native-base";

import { withNavigation } from "react-navigation";
import firebase from "firebase/app";
import "firebase/firestore";
require("../../config");
const db = firebase.firestore();

export default class ViewSubmission extends Component {
  state = { type: "", submission: null };

  componentDidMount() {
    let ac = this.props.ac;
    let task = this.props.task;
    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        return;
      }
      db.doc(`scavengerHunts/${ac}`)
        .collection("members")
        .doc(user.email)
        .collection("submissions")
        .doc(task)
        .get()
        .then(doc => {
          if (doc.exists) {
            let submitData = doc.data();
            let submission = "";
            let type = "";
            // console.log('sub ',doc.data())
            if (submitData.hasOwnProperty("textEntry")) {
              type = "text";
              submission = submitData.textEntry;
            } else if (submitData.hasOwnProperty("imageURL")) {
              type = "image";
              submission = submitData.imageURL;
            }

            this.setState({
              type,
              submission
            });
          }
        });
    });
  }
  //   componentWillUnmount() {
  //       this.unsubscribe();
  //   }

  render() {
    const { type, submission } = this.state;

    return (
      <Content style={{ marginTop: 20 }}>
        {submission && (
          <View>
            <H2 style={{ color: "red", marginBottom:10 }}>Submission: </H2>
            {type === "image" && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  source={{ uri: submission }}
                  style={{ height: 400, width: 400 }}
                />
              </View>
            )}
            {type === "text" && (
              <View>
                <Text>{submission}</Text>
              </View>
            )}
          </View>
        )}
      </Content>
    );
  }
}
