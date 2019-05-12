import React, { Component } from "react";
import { Alert, Picker } from "react-native";
import { Content, Text, Button, Form, Item, Input, H1, View } from "native-base";
import firebase from "firebase/app";
import "firebase/firestore";

require("../../config");
const db = firebase.firestore();

const INITIAL_STATE = {
  score: 1,
  feedback: ""
};

export default class GiveScore extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = () => {
    const { score, feedback } = this.state;
    let self = this;

    let ac = this.props.ac;
    let email = this.props.email;
    let task = this.props.task;

    let data = {
      result: {
        score,
        feedback
      }
    };

    db.collection("scavengerHunts")
      .doc(ac)
      .collection("members")
      .doc(email)
      .collection("submissions")
      .doc(task)
      .update(data)
      .then(() => {
        self.setState({
          ...INITIAL_STATE
        });
        Alert.alert("Document successfully updated!");
      })
      .catch(error => {
        Alert.alert("Error updating document");
      });
  };

  render() {
    const isInvalid = this.state.score === "" || this.state.feedback === "";

    return (
      <Content>
        <H1 style={{ marginTop: 10 }}>Give Score:</H1>
        <Picker
          selectedValue={this.state.score}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ score: itemValue })
          }
        >
          <Picker.Item label="Correct" value={1} />
          <Picker.Item label="Incorrect" value={0} />
        </Picker>

        <Form style={{ marginBottom: 10 }}>
          <Item>
            <Input
              placeholder="Type feedback here"
              autoCapitalize="none"
              onChangeText={feedback => this.setState({ feedback })}
              value={this.state.feedback}
            />
          </Item>
        </Form>
        <Button
          style={{ marginBottom: 10 }}
          block
          danger
          onPress={this.onSubmit}
          disabled={isInvalid}
        >
          <Text>Sumbit</Text>
        </Button>
      </Content>
    );
  }
}
