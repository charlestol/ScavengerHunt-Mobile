import React, { Component } from "react";
// import { View, Text, StyleSheet, Button } from 'react-native';
import { StyleSheet } from "react-native";

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
  View,
  Form,
  Item,
  Input
} from "native-base";
import firebase from "firebase/app";
import "firebase/firestore";
require("../../config");
const db = firebase.firestore();

export default class TaskItem extends Component {
  state = {
    task: {}
  };

  componentDidMount() {
    let ac = this.props.navigation.state.params.accessCode;
    let name = this.props.navigation.state.params.name;
    // console.log(this.props.navigation.state.params.accessCode)
    db.collection("scavengerHunts")
      .doc(ac)
      .collection("tasks")
      .doc(name)
      .get()
      .then(doc => {
        // let task = {};
        if (doc.exists) {
          const data = doc.data();
          this.setState({
            task: data
          });
        }
      });
  }

  render() {
    const { task } = this.state;
    let ac = this.props.navigation.state.params.accessCode;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("ITaskList", {
                  accessCode: ac
                });
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Task</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{margin:10}}>
          <H2 style={{marginBottom:10}}> Name: {task.name}</H2>
          <H2 style={{marginBottom:10}}> Instructions: {task.instructions}</H2>
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
  container: {

  }
});
