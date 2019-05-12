import React, { Component } from "react";
import { StyleSheet } from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Segment,
  View
} from "native-base";
import firebase from "firebase/app";
import "firebase/firestore";
require("../../config");
const db = firebase.firestore();

export default class EventItem extends Component {
  state = { sh: {} };

  componentDidMount() {
    let ac = this.props.navigation.state.params.accessCode;
    // console.log(this.props.navigation.state.params.accessCode)
    db.collection("scavengerHunts")
      .doc(ac)
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          sh: data,
          loading: false
        });
      });
  }
  render() {
    const { sh } = this.state;
    return (
      <Container style={styles.container}>
        <Header hasSegment>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Instructor")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{sh.name}</Title>
          </Body>
          <Right />
        </Header>
        {/* <Segment >
          <Button first>
            <Text>Members</Text>
          </Button>
          <Button last active>
            <Text>Tasks</Text>
          </Button>
        </Segment> */}
        <Content style={styles.content}>
          {sh.accessCode && (
            <View>
              <Button
                style={styles.btnSpacing}
                block
                onPress={() => {
                  this.props.navigation.navigate("IMemberList", {
                    accessCode: sh.accessCode
                  });
                }}
              >
                <Text>Members</Text>
              </Button>
              <Button
                style={styles.btnSpacing}
                block
                onPress={() => {
                  this.props.navigation.navigate("ITaskList", {
                    accessCode: sh.accessCode
                  });
                }}
              >
                <Text>Tasks</Text>
              </Button>
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
  container: {},
  content: {
    margin: 10
  },
  btnSpacing: {
    marginBottom: 10
  }
});
