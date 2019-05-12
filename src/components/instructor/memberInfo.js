import React, { Component } from "react";
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
  View
} from "native-base";
import MemTaskList from "./memberTaskList";
import TotalScore from "./scoreTotal";

import firebase from "firebase/app";
import "firebase/firestore";

require("../../config");
const db = firebase.firestore();

export default class MemberInfo extends Component {
  state = { memberInfo: null };
  componentDidMount() {
    let ac = this.props.navigation.state.params.accessCode;
    let email = this.props.navigation.state.params.email;

    db.collection("scavengerHunts")
      .doc(ac)
      .collection("members")
      .doc(email)
      .get()
      .then(doc => {
        const memberInfo = doc.data();
        // console.log(memberInfo)
        this.setState({ memberInfo });
      });
  }

  render() {
    const { memberInfo } = this.state;
    let ac = this.props.navigation.state.params.accessCode;
    let email = this.props.navigation.state.params.email;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("IMemberList", {
                  accessCode: ac
                });
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Member Info</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{ margin: 10 }}>
          <H1 />
          {memberInfo && (
            <View>
              <H1 style={{ marginBottom: 10 }}>Name: {memberInfo.name}</H1>
              <H1 style={{ marginBottom: 10 }}>Email: {memberInfo.email}</H1>
              <TotalScore ac={ac} email={email} />
              {/* <H1 style={{ marginBottom: 10 }}>Task List</H1> */}
              <MemTaskList ac={ac} email={email} />
            </View>
          )}
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
