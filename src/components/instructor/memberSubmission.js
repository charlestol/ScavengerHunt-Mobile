import React, { Component } from "react";
// import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { StyleSheet, Image } from "react-native";
import {
  Container,
  Content,
  Header,
  Title,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  H1,
  H2,
  View
} from "native-base";
import GiveScore from "./scoreTask";

import firebase from "firebase/app";
import "firebase/firestore";

require("../../config");
const db = firebase.firestore();

export default class Submission extends Component {
  state = { type: "", submission: "", score: "-", feedback: null };

  componentDidMount() {
    let ac = this.props.navigation.state.params.accessCode;
    let email = this.props.navigation.state.params.email;
    let task = this.props.navigation.state.params.task;

    db.collection("scavengerHunts")
      .doc(ac)
      .collection("members")
      .doc(email)
      .collection("submissions")
      .doc(task)
      .get()
      .then(doc => {
        let submitData = doc.data();
        let submission = "";
        let type = "";

        if (submitData.hasOwnProperty("textEntry")) {
          type = "text";
          submission = submitData.textEntry;
        } else if (submitData.hasOwnProperty("imageURL")) {
          type = "image";
          submission = submitData.imageURL;
        }

        if (submitData.hasOwnProperty("result")) {
          let score = submitData.result.score;
          let feedback = submitData.result.feedback;
          this.setState({
            type,
            submission,
            score,
            feedback
          });
        } else {
          this.setState({
            type,
            submission
          });
        }
      });
  }

  render() {
    const { type, submission, score, feedback } = this.state;

    let ac = this.props.navigation.state.params.accessCode;
    let email = this.props.navigation.state.params.email;
    let task = this.props.navigation.state.params.task;

    // console.log(this.props)
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("IMemberInfo", {
                  accessCode: ac,
                  email: email
                });
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Submission</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{ margin: 10 }}>
          <View>
            <H1 style={{ marginBottom: 10 }}>Score: {score}/1</H1>
            {feedback && <H1 style={{ marginBottom: 10 }}>{feedback}</H1>}
          </View>
          {type === "image" && (
            <View>
              <Image
                source={{ uri: submission }}
                style={{ width: 400, height: 400 }}
              />
            </View>
          )}
          {type === "text" && (
            <View>
              <H1>{submission}</H1>
            </View>
          )}
          <GiveScore ac={ac} email={email} task={task} />
        </Content>

        <Footer>
          <FooterTab>
            <Button
              onPress={() => this.props.navigation.navigate("DashboardT")}
            >
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate("ProfileT")}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate("EventCreate")}
            >
              <Icon name="ios-create" />
              <Text>Create</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
