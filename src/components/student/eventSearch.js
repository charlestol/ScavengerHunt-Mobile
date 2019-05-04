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
  Form,
  Item,
  Input,
  H2,
  H1,
  View,
  Separator
} from "native-base";
import JoinEvent from "./eventJoin";
import firebase from "firebase/app";
import "firebase/firestore";
require("../../config");
const db = firebase.firestore();

const ERROR_DOES_NOT_EXIST =
  "Invalid access code entered. Either the event has ended, it was mis-typed or it does not exist. Contact your instructor for verification.";

export default class SearchEvent extends Component {
  state = { accessCode: "", scavengerHunt: null, closed: false, error: null };

  onSearch = () => {
    const { accessCode } = this.state;

    db.collection("scavengerHunts")
      .doc(accessCode)
      .get()
      .then(doc => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          const sh = doc.data();
          const closed = sh.closed;

          if (!closed) {
            this.setState({
              scavengerHunt: sh,
              closed: false,
              error: null
            });
          } else {
            this.setState({
              scavengerHunt: null,
              closed: true,
              error: null
            });
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!", ERROR_DOES_NOT_EXIST);
          this.setState({
            error: ERROR_DOES_NOT_EXIST,
            scavengerHunt: null,
            closed: false
          });
        }
      })
      .catch(error => {
        this.setState({
          error: error,
          scavengerHunt: null
        });
        console.log("Error getting document:", error);
      });
  };

  render() {
    const { accessCode, closed, scavengerHunt, error } = this.state;
    const disabled = accessCode === "";
    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>Search</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{ margin: 10 }}>
          <H2>Search Event</H2>
          <Form style={{ marginBottom: 10, marginBottom: 10 }}>
            <Item>
              <Input
                onChangeText={accessCode => this.setState({ accessCode })}
                value={this.state.accessCode}
                placeholder="Input access code"
              />
              <Button rounded info onPress={this.onSearch} disabled={disabled}>
                <Icon name="search" />
              </Button>
            </Item>
          </Form>
          {scavengerHunt && !closed && (
            <View style={{ marginTop: 20 }}>
              <H2>Event Name: {scavengerHunt.name}</H2>
              <JoinEvent scavengerHunt={scavengerHunt} />
            </View>
          )}
          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </Content>

        <Footer>
          <FooterTab>
            <Button
              onPress={() => this.props.navigation.navigate("DashboardS")}
            >
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate("ProfileS")}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate("EventSearch")}
            >
              <Icon name="search" />
              <Text>Search</Text>
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
